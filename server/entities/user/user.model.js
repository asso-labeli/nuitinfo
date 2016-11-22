'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    lastName : {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    biography: {
        type: String
    },
    birthday: {
        type: Date
    },
    school: {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institution'
        },
        studyYear: {
            type: Number
        },
        pathway : {
            type: String
        }
    },
    material : {
        hasMaterial : {
            type: Boolean,
            default: false
        },
        isDesktop : Boolean,
        hasWiFi: Boolean
    },
    mailForRecruitment: {
        type: Boolean,
        default: true
    },
    cremiAccount : {
        needed : {
            type: Boolean,
            default: false
        },
        studentNumber : Number,
        studentMail : String
    },
    team : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    passwordRecoveryToken : {
        type: String
    },
    isSystemAccount: {
        type: Boolean,
        default: false
    },
    data : mongoose.Schema.Types.Mixed
});

require('./user.controller')(userSchema);

module.exports = mongoose.model('User', userSchema);
