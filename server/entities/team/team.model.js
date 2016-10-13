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
        required: true,
        unique: true
    },
    description : {
        type: String
    },
    logisticsRequirements : {
        type: String
    },
    application : {
        open : {
            type: Boolean,
            default: true
        },
        list : [{
            type: mongoose.Schema.Types.ObjectId
        }]
    },
    cremiRoom : {
        type: String
    }
});

require('./team.controller')(teamSchema);

module.exports = mongoose.model('Team', teamSchema);
