'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let applicationSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    team : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    message : {
        type: String
    },
    fromUser : {
        type: Boolean
    },
    fromTeam : {
        type: Boolean
    }
});

require('./application.controller')(applicationSchema);

module.exports = mongoose.model('Application', applicationSchema);
