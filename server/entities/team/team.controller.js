'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (teamSchema) {

    /* Controllers methods */

    teamSchema.statics.create = function (params, callback) {
        let Self = this;

        let team = new Self(params);

        team.save(callback);
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

    /* Express calls */

    teamSchema.statics.exCreate = function (req, res) {
        if (!req.isLogged()) {
            return Response.notAllowed(res);
        }

        async.waterfall([
            (next) => checkParametersExistsForCreate(req, res, next),
            (next) => mongoose.model('Team').create(req.body, next)
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
};