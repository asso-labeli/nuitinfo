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

    teamSchema.statics.edit = function (params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findById(params._id, next),
            (team, next) => {
                if (!team) {
                    next('Team not found');
                }

                if (team.members.leader.equals(params.leaderId)) {
                    Self.update({_id: params._id}, {$set: params}, next);
                } else {
                    next('Logged user isn\'t the leader of the team');
                }
            }
        ], (err, team) => {
            if (err) {
                return callback(err);
            }

            callback(null, team);
        });
    };

    teamSchema.statics.delete = function (params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findById(params._id, next),
            (team, next) => {
                if (!team) {
                    next('Team not found');
                }

                if (team.members.leader.equals(params.leaderId)) {
                    mongoose.model('Team').remove({_id: params._id}, next);
                } else {
                    next('Logged user isn\'t the leader of the team');
                }
            }
        ], (err, team) => {
            if (err) {
                return callback(err);
            }

            callback(null, team);
        });
    };

    teamSchema.statics.findTeamForUser = function (params, callback) {
        mongoose.model('Team').findOne({
            $or: [{
                'members.list': params.user
            }, {
                'members.leader': params.user
            }]
        }, callback);
    };
    
    teamSchema.statics.addUser = function(params, callback){
        mongoose.model('Team').update(
            {_id: params.team._id},
            {$push: { 'members.list' : params.user._id}},
            (err) => {
                if (err) {
                    return callback(err);
                }

                callback();
            });
    };

    teamSchema.statics.getById = function(params, callback){
        mongoose.model('Team')
            .findById(params.id)
            .populate('members.leader members.list')
            .exec(callback);
    };

    teamSchema.statics.getAll = function (params, callback){
        mongoose.model('Team')
            .find()
            .exec(callback);
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

    function checkParametersExistsForEdit(req, res, callback) {
        if (!req.body || !req.body._id) {
            Response.missing(res, '_id', -11);
            return callback({alreadySent: true});
        }

        if (req.body.members) {
            req.body.members = undefined;
        }

        if (req.body.applications) {
            req.body.applications = undefined;
        }

        if (req.body.data) {
            req.body.data = undefined;
        }

        callback();
    }

    function checkParametersExistsForDelete(req, res, callback) {
        if (!req.body || !req.body._id) {
            Response.missing(res, '_id', -11);
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
            // Check if user already have team
            (next) => mongoose.model('Team').findTeamForUser({user: req.user._id}, next),
            (team, next) => {
                if (!team || !team._id){
                    return next();
                }

                next('User already have team');
            },
            // Create team
            (next) => {
                if (!req.body.members) {
                    req.body.members = {};
                }

                req.body.members.leader = req.user._id;
                mongoose.model('Team').create(req.body, next);
            },
            // Add team to user
            (team, entryCreated, next) =>
                mongoose.model('User').changeTeam({
                    user: req.user,
                    team: team
                }, (err) => next(err, team))
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

    teamSchema.statics.exEdit = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForEdit(req, res, next),
            (next) => {
                req.body.leaderId = req.user._id;
                mongoose.model('Team').edit(req.body, next);
            }
        ], (err) => {
            if (err && err.alreadySent) {
                return;
            } else if (err) {
                return Response.editError(res, err);
            }

            return Response.success(res, 'Edit successful');
        });
    };

    teamSchema.statics.exDelete = function (req, res) {
        if (!req.isLogged) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForDelete(req, res, next),
            (next) => {
                req.body.leaderId = req.user._id;
                mongoose.model('Team').delete(req.body, next);
            }
        ], (err) => {
            if (err && err.alreadySent) {
                return;
            } else if (err) {
                return Response.deleteError(res, err);
            }

            return Response.success(res, 'Team deleted');
        });
    };

    teamSchema.statics.exGet = function (req, res) {
        mongoose.model('Team').getById(req.params, (err, team) => {
            if (err) {
                return Response.selectError(err);
            }

            if (!team) {
                return Response.resourceNotFound(res, 'team');
            }

            Response.success(res, 'Team found', team);
        });
    };

    teamSchema.statics.exGetAll = function (req, res) {
        mongoose.model('Team').getAll({}, (err, teams) => {
            if (err) {
                return Response.selectError(err);
            }

            if (!teams || teams.length === 0){
                return Response.resourceNotFound(res, 'teams');
            }

            Response.success(res, 'Teams found', teams);
        });
    };
};