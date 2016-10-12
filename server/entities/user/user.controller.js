'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');
let PassTools = require('../../tools/passTools');

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
        console.log(req.user);
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
};