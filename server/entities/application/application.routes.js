'use strict';

let express = require('express');
let Application = require('mongoose').model('Application');

let router = express.Router();

router.post('/fromUser', Application.exCreateFromUser);

module.exports = router;