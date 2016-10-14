'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (applicationSchema) {

    /* Controller methods */

    applicationSchema.statics.create = function(params, callback){
        let Self = this;

        let application = new Self(params);

        application.save(callback);
    };
    
    /* Express methods verifications */
    
    function checkParametersForCreate(req, res, callback){
        if (!req.body || !req.body.user){
            Response.missing(res, 'user', -11);
        } else if (!req.body.team){
            Response.missing(res, 'team', -12);
        } else if (!req.body.fromUser && !req.body.fromTeam){
            Response.missing(res, 'fromUser || fromTeam', -13);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    /* Express methods */

    applicationSchema.statics.exCreateFromUser = function(req, res){
        if (!req.isLogged()){
            return Response.notAllowed(res);
        }

        req.body.fromUser = true;
        req.body.fromTeam = undefined;
        req.body.user = req.user._id;

        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            // Search if user already have team
            (next) => mongoose.model('Team').findTeamForUser({user : req.body.user},
                next),
            (team, next) => {
                if (!team || !team._id){
                    return next();
                }

                next('User already have team');
            },
            // Check if there's already an application between this team
            // and this user
            (next) => mongoose.model('Application').findOne({
                user: req.body.user,
                team: req.body.team
            }, next),
            (application, next) => {
                if (!application || !application._id){
                    return next();
                }

                next('Application already exists between this user and this' +
                    ' team');
            },
            (next) => mongoose.model('Application').create(req.body, next)
        ], (err, application) => {
            if (err && err.alreadySent){
                return;
            }

            if (err){
                return Response.insertError(res, err);
            }

            Response.success(res, 'Application added', application);
        });
    };

};