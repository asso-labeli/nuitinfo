'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (institutionSchema) {

    /* Controller methods */

    institutionSchema.statics.create = function (params, callback) {
        let Self = this;

        let application = new Self(params);

        application.save(callback);
    };

    /* Express methods verifications */

    function checkParametersForCreate(req, res, callback) {
        if (!req.body || !req.body.name) {
            Response.missing(res, 'name', -11);
        } else {
            return callback();
        }

        callback({alreadySent: true});
    }


    /* Express methods */

    institutionSchema.statics.exCreate = function (req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            // Search if user already have team
            (next) => mongoose.model('Institution').create(req.body, next)
        ], (err, institution) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.insertError(res, err);
            }

            Response.success(res, 'Institution added', institution);
        });
    };

    institutionSchema.statics.exGet = function (req, res) {
        mongoose.model('Institution').find({}, '-__v', (err, institutions) => {
            if (err){
                return Response.selectError(res, err);
            }

            if (!institutions || !institutions.length){
                return Response.resourceNotFound(res, 'institutions');
            }

            Response.success(res, 'Institutions found', institutions);
        });
    };
};