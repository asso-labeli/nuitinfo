'use strict';

let express = require('express');
let passport = require('passport');
let mongoose = require('mongoose');
let jwt = require('jwt-simple');
let Response = require('../response');
let PassTools = require('../passTools');

let router = express.Router();

require('../../config/passsport').configure(passport);

router.post('/login', (req, res) => {
    if(!req.body || !req.body.login){
        return Response.missing(res, 'login', -11);
    } else if (!req.body.password){
        return Response.missing(res, 'password', -12);
    }

    mongoose.model('User').findOne({login: req.body.login}, function(err, user){
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
            }else {
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


module.exports = router;