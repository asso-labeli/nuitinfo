'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (teamSchema) {

    /* Controllers methods */

    teamSchema.statics.create = function (params, callback) {
        let Self = this;

        console.log(params);

        let team = new Self(params);

        team.save(callback);
    };

    teamSchema.statics.delete = function (params, callback){
        let Self = this;

        async.waterfall([
            (next) => Self.findById(params.teamId, next),
            (team, next) => {
                if (!team){
                    next('Team not found');
                }

                if (team.members.leader.equals(params.leaderId)) {
                    mongoose.model('Team').remove({_id : params.teamId}, next);
                } else {
                    next('Logged user isn\'t the leader of the team');
                }
            }
        ], (err, team) => {
            if (err){
                return callback(err);
            }

            callback(null, team);
        });
    };

    /* Express methods verifications */

    function checkParametersExistsForCreate(req, res, callback) {
        if (!req.body || !req.body.name) {
            Response.missing(res, 'name', -11);
        } else if (!req.body.email) {
            Response.missing(res, 'email', -12);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    function checkParametersExistsForDelete(req, res, callback){
        if (!req.body || !req.body.teamId){
            Response.missing(res, 'teamId', -11);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    /* Express calls */

    teamSchema.statics.exCreate = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForCreate(req, res, next),
            (next) => {
                if (!req.body.members){
                    req.body.members = {};
                }

                req.body.members.leader = req.user._id;
                mongoose.model('Team').create(req.body, next);
            }
        ], (err, team) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err && err.code === Response.MongoCodes.alreadyExist) {
                if (err.message.indexOf('email') > -1) {
                    return Response.alreadyExist(res, 'email');
                } else {
                    return Response.alreadyExist(res, 'name');
                }
            } else if (err) {
                return Response.insertError(res, err);
            }

            return Response.success(res, 'Team added', team);
        });
    };

    teamSchema.statics.exDelete = function(req, res){
        if (!req.isLogged){
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForDelete(req, res, next),
            (next) => {
                req.body.leaderId = req.user._id;
                mongoose.model('Team').delete(req.body, next);
            }
        ], (err) => {
            if (err && err.alreadySent){
                return;
            } else if (err){
                return Response.deleteError(res, err);
            }

            return Response.success(res, 'Team deleted');
        });
    };
};