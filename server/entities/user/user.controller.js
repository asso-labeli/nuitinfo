'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');
let PassTools = require('../../tools/passTools');

const editableFields = {
    lastName: true,
    firstName: true,
    email: true,
    biography: true,
    birthday: true,
    school: {
        institution : true,
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

module.exports = function (userSchema) {

    /* Tool methods */

    userSchema.statics.computeLogin = function (firstName, lastName, callback) {
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

    function recursiveEdit(parametersObject, newParams, user){
        for (let key in parametersObject){
            if (!parametersObject.hasOwnProperty(key)){
                continue;
            }

            if (parametersObject[key] instanceof Object && newParams[key]){
                recursiveEdit(parametersObject[key], newParams[key], user[key]);
            } else if (newParams[key]) {
                user[key] = newParams[key];
            }
        }
    }

    function editUserParameters(params, user){
        recursiveEdit(editableFields, params, user);
    }

    /* Controllers methods */

    userSchema.statics.create = function (params, callback) {
        let Self = this;

        PassTools.hashPassword(params.password, (err, pass) => {
            if (err) {
                return callback(err);
            }
            params.password = pass;

            let user = new Self(params);

            user.save(callback);
        });
    };

    userSchema.statics.edit = function(params, callback){
        async.waterfall([
            (next) => mongoose.model('User').findById(params.user, next),
            (user, next) => {
                if (!user) {
                    callback('User not found');
                }

                editUserParameters(params, user);

                user.save(next);
            }
        ], callback);
    };

    userSchema.statics.changeTeam = function(params, callback){
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

    /* Express methods verifications */

    function checkParametersExistsForCreate(req, res, callback) {
        let parametersAreGood = false;

        if (!req.body || !req.body.firstName) {
            return Response.missing(res, 'firstName', -11);
        } else if (!req.body.lastName) {
            return Response.missing(res, 'lastName', -12);
        } else if (!req.body.email) {
            return Response.missing(res, 'email', -13);
        } else if (!req.body.password) {
            return Response.missing(res, 'password', -14);
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

    userSchema.statics.exCreate = function (req, res) {
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

    userSchema.statics.exEdit = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        req.body.user = req.user._id;

        mongoose.model('User').edit(req.body, (err, user) => {
            if (err) {
                return Response.selectError(res, err);
            }

            Response.success(res, 'User edited', user);
        });
    };
};