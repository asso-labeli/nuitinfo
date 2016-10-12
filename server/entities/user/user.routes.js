'use strict';

let express = require('express');
let User = require('mongoose').model('User');
let passport = require('passport');

let router = express.Router();

router.post('/add', User.exCreate);

module.exports = router;