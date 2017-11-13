'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');
let PassTools = require('../../tools/passTools');
let Mail = require('../../config/mail');

const editableFields = {
    lastName: true,
    firstName: true,
    email: true,
    biography: true,
    birthday: true,
    school: {
        institution: true,
        studyYear: true,
        pathway: true
    },
    material: {
        hasMaterial: true,
        isDesktop: true,
        hasWifi: true
    },
    mailForRecruitment: true,
    cremiAccount: {
        needed: true,
        studentNumber: true,
        studentMail: true
    }
};

module.exports = function(userSchema) {

    /* Tool methods */

    userSchema.statics.computeLogin = function(firstName, lastName, callback) {
        let login = firstName.substr(0, 1).toLowerCase() + '.' +
            lastName.substr(0, 9).toLocaleLowerCase();
        let lastLogin = login;
        let initialLogin = login;
        let currentNumber = 1;

        let user = '';

        async.whilst(
            // Check if a user exist with this login
            () => user !== null,
            // Search a login and compute a new one
            (checkTest) => {
                this.findOne({login: login}, (err, userFound) => {
                    if (err) {
                        return checkTest(err);
                    }

                    // Keep found user in memory for the test
                    user = userFound;

                    // Keep the login in memory
                    lastLogin = login;

                    // Create a new login
                    login = initialLogin + currentNumber;
                    currentNumber++;

                    // Call whilst callback
                    checkTest(null);
                });
            },
            (err) => {
                if (err) {
                    return callback(err);
                }

                callback(null, lastLogin);
            }
        );
    };

    function recursiveEdit(parametersObject, newParams, user) {
        for (let key in parametersObject) {
            if (!parametersObject.hasOwnProperty(key)) {
                continue;
            }

            if (parametersObject[key] instanceof Object && newParams[key]) {
                recursiveEdit(parametersObject[key], newParams[key], user[key]);
            } else if (newParams[key]) {
                user[key] = newParams[key];
            }
        }
    }

    function editUserParameters(params, user) {
        recursiveEdit(editableFields, params, user);
    }

    function getCorrectDate(stringDate) {
        if (stringDate.indexOf('/') > -1) {
            // Firefox Date
            let tokens = stringDate.split('/');
            return new Date(tokens[2], tokens[1] - 1, tokens[0]);
        } else if (stringDate.indexOf('-') > -1) {
            // Chrome Date
            let tokens = stringDate.split('-');
            return new Date(tokens[0], tokens[1] - 1, tokens[2]);
        }
    }

    /* Controllers methods */

    userSchema.statics.create = function(params, callback) {
        let Self = this;

        params.team = undefined;
        params.paswordRecoveryToken = undefined;
        params.data = undefined;

        async.waterfall([
            (next) => PassTools.hashPassword(params.password, next),
            (pass, next) => {
                params.password = pass;

                if (params.birthday) {
                    params.birthday = getCorrectDate(params.birthday);
                }

                let user = new Self(params);

                user.save(next);
            },
            (user, requests, next) => {
                Mail.sendSubscribeMail({
                    to: user.email
                }, (err) => next(err, user));
            }
        ], callback);
    };

    userSchema.statics.edit = function(params, callback) {
        async.waterfall([
            (next) => mongoose.model('User').findById(params.user, next),
            (user, next) => {
                if (!user) {
                    callback('User not found');
                }

                if (params.birthday) {
                    params.birthday = getCorrectDate(params.birthday);
                }

                editUserParameters(params, user);

                user.save(next);
            }
        ], callback);
    };

    userSchema.statics.changeTeam = function(params, callback) {
        mongoose.model('User').update(
            {_id: params.user._id},
            {team: params.team._id},
            (err) => {
                if (err) {
                    return callback(err);
                }

                callback();
            });
    };

    userSchema.statics.getById = function(params, callback) {
        mongoose.model('User')
            .findById(params.id)
            .select('firstName lastName school team biography')
            .populate('team school.institution')
            .exec(callback);
    };

    userSchema.statics.getAll = function(params, callback) {
        mongoose.model('User')
            .find(params)
            .select('firstName lastName school team biography')
            .populate('team school.institution')
            .exec(callback);
    };

    /* Express methods verifications */

    function checkParametersExistsForCreate(req, res, callback) {
        let parametersAreGood = false;

        req.body.isSystemAccount = false;

        if (!req.body || !req.body.firstName) {
            return Response.missing(res, 'firstName', -11);
        } else if (!req.body.lastName) {
            return Response.missing(res, 'lastName', -12);
        } else if (!req.body.email) {
            return Response.missing(res, 'email', -13);
        } else if (!req.body.password) {
            return Response.missing(res, 'password', -14);
        } else if (req.body.password.length < 4) {
            return Response.invalidParameter(res, 'password');
        } else {
            parametersAreGood = true;
        }

        if (parametersAreGood && !req.body.login) {
            mongoose.model('User').computeLogin(req.body.firstName,
                req.body.lastName, (err, login) => {
                    req.body.login = login;
                    callback(err);
                });
        } else if (parametersAreGood) {
            callback();
        } else {
            callback({
                alreadySent: true
            });
        }
    }

    /* Express calls */

    userSchema.statics.exCreate = function(req, res) {
        // To close registration, uncomment the two lines below
        // Response.closeRegistrations(res);
        // return false;

        async.waterfall([
            (next) => checkParametersExistsForCreate(req, res, next),
            (next) => mongoose.model('User').create(req.body, next)
        ], (err, user) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err && err.code === Response.MongoCodes.alreadyExist) {
                return Response.alreadyExist(res, 'email');
            } else if (err) {
                return Response.insertError(res, err);
            }

            return Response.success(res, 'User added', user);
        });
    };

    userSchema.statics.exEdit = function(req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        req.body.user = req.user._id;
        req.body.isSystemAccount = false;

        mongoose.model('User').edit(req.body, (err, user) => {
            if (err) {
                return Response.editError(res, err);
            }

            Response.success(res, 'User edited', user);
        });
    };

    userSchema.statics.exGet = function(req, res) {
        mongoose.model('User').getById(req.params, (err, user) => {
            if (err) {
                return Response.selectError(res, err);
            }

            if (!user) {
                return Response.resourceNotFound(res, 'user');
            }

            Response.success(res, 'User found', user);
        });
    };

    userSchema.statics.exGetAll = function(req, res) {
        mongoose.model('User').getAll(
            {'isSystemAccount': {$ne: true}},
            (err, users) => {
                if (err) {
                    return Response.selectError(res, err);
                }

                if (!users || users.length === 0) {
                    return Response.resourceNotFound(res, 'users');
                }

                Response.success(res, 'Users found', users);
            });
    };

    userSchema.statics.exGetLoggedUser = function(req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        mongoose.model('User').findById(req.user._id)
            .select('-password -__v')
            .populate('team')
            .exec((err, user) => {
                if (err) {
                    return Response.selectError(res, err);
                }

                if (!user) {
                    return Response.resourceNotFound(res, 'user');
                }

                user = user.toObject();

                if (user.team) {
                    user.team.isLeader = user._id.equals(user.team.members.leader);
                }

                Response.success(res, 'Logged user', user);
            });
    };
}
;