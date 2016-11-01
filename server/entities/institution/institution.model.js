'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let institutionSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    }
});

require('./institution.controller')(institutionSchema);

module.exports = mongoose.model('Institution', institutionSchema);
