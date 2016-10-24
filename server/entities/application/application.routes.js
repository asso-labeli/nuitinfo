'use strict';

let express = require('express');
let Application = require('mongoose').model('Application');

let router = express.Router();

router.post('/fromUser', Application.exCreateFromUser);
router.post('/fromTeam', Application.exCreateFromTeam);
router.post('/accept', Application.exAccept);

module.exports = router;