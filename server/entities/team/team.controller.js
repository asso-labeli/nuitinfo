'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (teamSchema) {

    /* Controllers methods */

    teamSchema.statics.create = function (params, callback) {
        let Self = this;

        params.data = undefined;
        params.members.list = [];

        let team = new Self(params);

        team.save(callback);
    };

    teamSchema.statics.edit = function (params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findOne({'members.leader': params.leaderId}, next),
            (team, next) => {
                if (!team || !team._id) {
                    next('No editable team found');
                }

                Self.update({_id: params._id}, {$set: params}, next);
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
            (next) => Self.findOne({'members.leader': params.leaderId}, next),
            (team, next) => {
                if (!team || !team._id) {
                    next('No editable team found');
                }

                Self.remove({_id: team._id}, next);
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

    teamSchema.statics.addUser = function (params, callback) {
        mongoose.model('Team').update(
            {_id: params.team._id},
            {$addToSet: {'members.list': params.user._id}},
            (err) => {
                if (err) {
                    return callback(err);
                }

                callback();
            });
    };

    teamSchema.statics.removeUser = function (params, callback){
        async.parallel([
            (stepOk) => mongoose.model('Team').update(
                {_id: params.team._id},
                {$pull: {'members.list': params.user._id}},
                stepOk),
            (stepOk) => mongoose.model('User').update(
                {_id: params.user._id},
                {$unset : {'team': ''}},
                stepOk)
        ], callback);
    };

    teamSchema.statics.getById = function (params, callback) {
        mongoose.model('Team')
            .findById(params.id)
            .populate('members.leader members.list')
            .exec(callback);
    };

    teamSchema.statics.getAll = function (params, callback) {
        mongoose.model('Team')
            .find()
            .exec(callback);
    };

    teamSchema.statics.changeLeader = function (params, callback) {
        mongoose.model('Team')
            .update({team: params.team._id},
                {$and : [
                    {$addToSet: {'members.list' : params.oldLeader._id}},
                    {$pull: {'members.list': params.newLeader._id}},
                    {$set: {'members.list': params.newLeader._id}}
                ]}, callback);
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

    function checkParametersExistsForKick(req, res, callback){
        if (!req.body || !req.body.user) {
            Response.missing(res, 'user', -11);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    function checkParametersExistsForChangeLeader(req, res, callback){
        if (!req.body || !req.body.leader) {
            Response.missing(res, 'leader', -11);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    /* Express calls */

    teamSchema.statics.exCreate = function (req, res) {
        Response.closeRegistrations(res);
        return false;

        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForCreate(req, res, next),
            // Check if user already have team
            (next) => mongoose.model('Team').findTeamForUser({user: req.user._id}, next),
            (team, next) => {
                if (!team || !team._id) {
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

        req.body.leaderId = req.user._id;

        mongoose.model('Team').edit(req.body, (err) => {
            if (err) {
                return Response.editError(res, err);
            }

            return Response.success(res, 'Edit successful', {});
        });
    };

    teamSchema.statics.exDelete = function (req, res) {
        if (!req.isLogged) {
            return Response.notAllowed(res);
        }

        req.body.leaderId = req.user._id;

        mongoose.model('Team').delete(req.body, (err) => {
            if (err) {
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

            if (!teams || teams.length === 0) {
                return Response.resourceNotFound(res, 'teams');
            }

            Response.success(res, 'Teams found', teams);
        });
    };

    teamSchema.statics.exKick = function (req, res) {
        if (!req.isLogged()){
            return Response.notLogged(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForKick(req, res, next),
            (next) => mongoose.model('Team').findOne({'members.leader': req.user._id}, next),
            (team, next) => {
                if (!team || !team._id){
                    Response.notAllowed(res);

                    return next({alreadySent: true});
                }

                next(undefined, team);
            },
            (team, next) => mongoose.model('Team').removeUser({
                team: team,
                user: {
                    _id: req.body.user
                }
            }, next)
        ], (err) => {
            if (err && err.alreadySent){
                return;
            } else if (err) {
                return Response.editError(res, err);
            }

            Response.success(res, 'Team successfully edited', {});
        });
    };

    teamSchema.statics.exChangeLeader = function (req, res) {
        if (!req.isLogged()){
            return Response.notLogged(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForChangeLeader(req, res, next),
            (next) => mongoose.model('Team').findOne({'members.leader': req.user._id}, next),
            (team, next) => {
                if (!team || !team._id){
                    Response.notAllowed(res);

                    return next({alreadySent: true});
                }

                for (let member of team.members.list){
                    if (member.equals(req.body.leader)){
                        next(undefined, {
                            team: team,
                            oldLeader: team.members.leader,
                            newLeader: req.body.leader
                        });
                    }
                }

                Response.resourceNotFound(res, 'user in team');
                next({alreadySent: true});
            },
            (params, next) => mongoose.model('Team').changeLeader(params, next)
        ], (err) => {
            if (err && err.alreadySent){
                return;
            } else if (err) {
                return Response.editError(res, err);
            }

            Response.success(res, 'Leader changed', {});
        });
    };

    teamSchema.statics.exLeave = function (req, res) {
        if (!req.isLogged()){
            return Response.notLogged(res);
        }

        async.waterfall([
            (next) => mongoose.model('Team').findOne({'members.list': req.user._id}, next),
            (team, next) => {
                if (!team){
                    mongoose.model('Team').findOne({'members.leader': req.user._id},
                    (err, leaderTeam) => {
                        if (err){
                            return next(err);
                        }

                        if (!leaderTeam){
                            Response.resourceNotFound(res, 'team');
                        } else {
                            Response.notHaveRights(res, 'Leader can\'t leave a team');
                        }

                        next({alreadySent: true});
                    });
                } else {
                    mongoose.model('Team').removeUser({
                        team: team,
                        user: req.user
                    }, next);
                }
            }
        ], (err) => {
            if (err && err.alreadySent){
                return;
            }

            if (err){
                return Response.editError(res, err);
            }

            Response.success(res, 'Team leaved', {});
        });
    };
};