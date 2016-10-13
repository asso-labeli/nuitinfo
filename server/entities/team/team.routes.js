'use strict';

let express = require('express');
let Team = require('mongoose').model('Team');
let passport = require('passport');

let router = express.Router();

router.post('/add', Team.exCreate);

module.exports = router;