'use strict';

let express = require('express');
let passport = require('passport');
let mongoose = require('mongoose');
let async = require('async');
let jwt = require('jwt-simple');
let Response = require('../response');
let PassTools = require('../passTools');
let Mail = require('../../config/mail');

let router = express.Router();

require('../../config/passsport').configure(passport);

router.post('/login', (req, res) => {
    if(!req.body || !req.body.email){
        return Response.missing(res, 'email', -11);
    } else if (!req.body.password){
        return Response.missing(res, 'password', -12);
    }

    mongoose.model('User').findOne({email: req.body.email}, function(err, user){
        if (err){
            return Response.authenticationFailed(res, 'Error', err);
        }

        if (!user){
            return Response.authenticationFailed(res, 'Error : Bad login');
        }

        PassTools.isPasswordGood(req.body.password, user.password, (err, result) => {
            if (err){
                return Response.authenticationFailed(res, 'Error', err);
            }

            if (result === true){
                let payload = {_id: user._id};
                let token = jwt.encode(payload, process.env.JWT_SECRET);

                return Response.success(res, 'Authentication successfull', {
                    token: token
                });
            } else {
                return Response.authenticationFailed(res, 'Error : Bad' +
                    ' password');
            }
        });
    });
});

router.get('/logout', function(req, res){
    req.logout();
    Response.success(res, 'Logout successful');
});

router.post('/passwordRecovery', (req, res) => {
    if (!req.body || !req.body.email){
        return Response.missing(res, 'email', -11);
    }

    async.waterfall([
        (next) => mongoose.model('User').findOne({email: req.body.email}, next),
        (user, next) => {
            if (!user) {
                Response.resourceNotFound(res, 'user');
                return next({
                    alreadySent: true
                });
            }

            PassTools.hashPassword(
                user.email + Date.now() + Math.random(),
                (err, recoveryToken) => next(err, user, recoveryToken));
        },
        (user, token, next) => {
            token = token.replace(/\//g, '');
            user.passwordRecoveryToken = token;

            user.save((err) => next(err, user, token));
        },
        (user, token, next) =>
            Mail.sendPasswordRecoveryMail({
                to: user.email,
                url: process.env.WEBSERVER_URL + '/recovery/' + token
            }, next)
    ], (err) => {
        if (err && err.alreadySent){
            return;
        } else if (err) {
            return Response.selectError(res, err);
        }

        Response.success(res, 'Mail sent');
    });
});

router.post('/recovery/:token', (req, res) => {
    if (!req.body || !req.body.password){
        return Response.missing(res, 'password', -11);
    } else if (req.body.password.length < 4){
		return Response.invalidParameter(res, 'password');
	}

    async.waterfall([
        (next) => mongoose.model('User').findOne({passwordRecoveryToken: req.params.token}, next),
        (user, next) => {
            if (!user) {
                Response.resourceNotFound(res, 'user');
                return next({
                    alreadySent: true
                });
            }

            PassTools.hashPassword(req.body.password, (err, password) =>
                next(err, user, password));
        },
        (user, password, next) => {
            user.password = password;
            user.passwordRecoveryToken = undefined;

            user.save((err) => next(err, user));
        },
		(user, next) => {
			Mail.sendPasswordChangedMail({
				to: user.email
			}, (err) => next(err, user));
		}
    ], (err, user) => {
        if (err && err.alreadySent){
            return;
        } else if (err) {
            return Response.selectError(res, err);
        }

        Response.success(res, 'Password changed', user);
    });
});

module.exports = router;