'use strict';

let express = require('express');
let mongoose = require('mongoose');

let Response = require('../response');

let router = express.Router();

router.get('/users', (req, res) => {
    mongoose.model('User').aggregate([{
        $group : {_id: '_id', users : {$sum : 1}}
    }], (err, result) => {
        if (err){
            return Response.selectError(res, err);
        }

        Response.success(res, 'Found', result);
    });
});
module.exports = router;