'use strict';

let express = require('express');
let mongoose = require('mongoose');
let async = require('async');

let Response = require('../response');

let router = express.Router();

router.get('/users', (req, res) => {
    mongoose.model('User').aggregate([{
        $group : {_id: '_id', users : {$sum : 1}}
    }], (err, result) => {
        if (err){
            return Response.selectError(res, err);
        }
        if (!result[0] || !result[0].users){
            return Response.resourceNotFound(res, 'users');
        }

        Response.success(res, 'Statistics of users', {
            users: result[0].users
        });
    });
});

router.get('/teams', (req, res) => {
    mongoose.model('Team').aggregate([{
        $group : {_id: '_id', teams : {$sum : 1}}
    }], (err, result) => {
        if (err){
            return Response.selectError(res, err);
        }

        if (!result[0] || !result[0].teams){
            return Response.resourceNotFound(res, 'teams');
        }

        Response.success(res, 'Statistics of teams', {
            teams: result[0].teams
        });
    });
});

router.get('/users/byInstitution', (req, res) => {
    mongoose.model('User').aggregate([{
        $group: {_id: '$school.institution', users : {$sum : 1}}
    }], (err, result) => {
        if (err){
            return Response.selectError(res, err);
        }
        if (!result || !result[0]){
            return Response.resourceNotFound(res, 'users');
        }

        async.map(result, (oneResult, callback) => {
            if (oneResult._id === null){
                return callback(null, {
                    institution: null,
                    users: oneResult.users
                });
            }

            mongoose.model('Institution').findById(oneResult._id, '-__v', (err, institution) => {
                callback(err, {
                    institution: institution,
                    users: oneResult.users
                });
            });
        }, (err, populatedResult) => {
            if (err){
                return Response.selectError(res, err);
            }

            Response.success(res, 'Statistics of users by institution', populatedResult);
        });
    });
});

module.exports = router;