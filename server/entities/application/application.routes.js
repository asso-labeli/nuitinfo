'use strict';

let express = require('express');
let Application = require('mongoose').model('Application');

let router = express.Router();

router.post('/fromUser', Application.exCreateFromUser);
router.post('/fromTeam', Application.exCreateFromTeam);
router.post('/accept', Application.exAccept);
router.post('/refuse', Application.exRefuse);
router.get('/forUser', Application.exGetForUser);

module.exports = router;