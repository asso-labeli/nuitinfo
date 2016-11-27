'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let teamSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    logisticsRequirements : {
        type: String
    },
    openForApplications : {
        type: Boolean,
        default: true
    },
    members : {
        leader : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        list : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    cremiRoom : {
        type: String
    },
    data : mongoose.Schema.Types.Mixed
});

require('./team.controller')(teamSchema);

module.exports = mongoose.model('Team', teamSchema);
