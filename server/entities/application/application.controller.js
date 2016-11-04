'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (applicationSchema) {
    /* Tools functions */

    function checkApplicationHasGoodTeam(application, params, callback) {
        mongoose.model('User')
            .findById(params.user)
            .populate('team')
            .exec((err, user) => {
                if (err) {
                    return callback(err);
                }

                if (application.params.equals(user.team.members.leader)) {
                    return callback(null, application);
                }

                callback('Logged user isn\'t the leader of the team');
            });
    }

    /* Controller methods */

    applicationSchema.statics.create = function (params, callback) {
        let Self = this;

        let application = new Self(params);

        application.save(callback);
    };

    applicationSchema.statics.accept = function (params, callback) {
        async.waterfall([
            (next) => mongoose.model('Application').findById(params.application, next),
            (application, next) => {
                if (application && application._id) {
                    if (application.fromTeam && application.user.equals(params.user)) {
                        return next(undefined, application);
                    } else if (application.fromUser) {
                        return checkApplicationHasGoodTeam(application, params, next);
                    } else {
                        return next('Application\'s user isn\'t the same than logged user');
                    }
                }

                next('Application not found');
            },
            (application, next) => async.parallel([
                (finished) => mongoose.model('User').changeTeam({
                    user: {_id: application.user},
                    team: {_id: application.team}
                }, finished),
                (finished) => mongoose.model('Team').addUser({
                    user: {_id: application.user},
                    team: {_id: application.team}
                }, finished)
            ], (err) => next(err, application)),
            (application, next) =>
                mongoose.model('Application').remove({_id: application._id}, next)
        ], callback);
    };

    applicationSchema.statics.refuse = function (params, callback) {
        async.waterfall([
            (next) => mongoose.model('Application').findById(params.application, next),
            (application, next) => {
                if (application && application._id) {
                    if (application.user.equals(params.user)) {
                        return next(undefined, application);
                    } else if (application.fromUser) {
                        return checkApplicationHasGoodTeam(application, params, next);
                    } else {
                        return next('Application\'s user isn\'t the same than logged user');
                    }
                }

                next('Application not found');
            },
            (application, next) =>
                mongoose.model('Application').remove({_id: application._id}, next)
        ], callback);
    };

    /* Express methods verifications */

    function checkParametersForCreate(req, res, callback) {
        if (!req.body || !req.body.user) {
            Response.missing(res, 'user', -11);
        } else if (!req.body.team) {
            Response.missing(res, 'team', -12);
        } else if (!req.body.fromUser && !req.body.fromTeam) {
            Response.missing(res, 'fromUser || fromTeam', -13);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    function checkParametersForAcceptAndRefuse(req, res, callback) {
        if (!req.body || !req.body.application) {
            Response.missing(res, 'application', -11);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }

    /* Express methods */

    applicationSchema.statics.exCreateFromUser = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        req.body.fromUser = true;
        req.body.fromTeam = undefined;
        req.body.user = req.user._id;

        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            // Search if user already have team
            (next) => mongoose.model('Team').findTeamForUser({user: req.body.user},
                next),
            (team, next) => {
                if (!team || !team._id) {
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
                if (!application || !application._id) {
                    return next();
                }

                next('Application already exists between this user and this' +
                    ' team');
            },
            (next) => mongoose.model('Application').create(req.body, next)
        ], (err, application) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.insertError(res, err);
            }

            Response.success(res, 'Application added', application);
        });
    };

    applicationSchema.statics.exCreateFromTeam = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        req.body.fromTeam = true;
        req.body.fromUser = undefined;

        async.waterfall([
            // Search team with logged user as owner
            (next) => mongoose.model('Team').findOne({'members.leader': req.user._id}, next),
            (team, next) => {
                if (team && team._id) {
                    req.body.team = team;
                    return next();
                }

                next('No team with connected user as owner found');
            },
            // Check parameters
            (next) => checkParametersForCreate(req, res, next),
            // Search existing application between this team and this user
            (next) => mongoose.model('Application').findOne({
                user: req.body.user,
                team: req.body.team
            }, next),
            (application, next) => {
                if (!application || !application._id) {
                    return next();
                }

                next('Application already exists between this user and this team');
            },
            // Create new application
            (next) => mongoose.model('Application').create(req.body, next)
        ], (err, application) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.insertError(res, err);
            }

            Response.success(res, 'Application added', application);
        });
    };

    applicationSchema.statics.exAccept = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersForAcceptAndRefuse(req, res, next),
            (next) => mongoose.model('Application').accept({
                application: req.body.application,
                user: req.user._id
            }, next)
        ], (err) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.deleteError(res, err);
            }

            Response.success(res, 'Application accepted', {});
        });
    };

    applicationSchema.statics.exRefuse = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersForAcceptAndRefuse(req, res, next),
            (next) => mongoose.model('Application').refuse({
                application: req.body.application,
                user: req.user._id
            }, next)
        ], (err) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.deleteError(res, err);
            }

            Response.success(res, 'Application refused', {});
        });
    };

    applicationSchema.statics.exGetForUser = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        mongoose.model('Application').find({user: req.user._id, fromTeam: true})
            .populate('team')
            .exec((err, applications) => {
                if (err) {
                    return Response.selectError(res, err);
                }

                if (!applications) {
                    return Response.resourceNotFound(res, 'application');
                }

                Response.success(res, 'Applications found', applications);
            });
    };

    applicationSchema.statics.exGetForTeam = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => mongoose.model('Team').findOne({'members.leader': req.user._id}, next),
            (team, next) => {
                if (!team || !team._id) {
                    Response.notAllowed(res);

                    return next({alreadySent: true});
                }

                mongoose.model('Application').find({
                    team: team._id,
                    fromUser: true
                })
                    .populate('user')
                    .exec(next);
            }
        ], (err, applications) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.selectError(res, err);
            }

            if (!applications) {
                return Response.resourceNotFound(res, 'application');
            }

            Response.success(res, 'Applications found', applications);
        });
    };
};