'use strict';

let express = require('express');
let Team = require('mongoose').model('Team');
let passport = require('passport');

let router = express.Router();

router.post('/', Team.exCreate);
router.put('/', Team.exEdit);
router.delete('/', Team.exDelete);
router.get('/:id', Team.exGet);
router.get('/', Team.exGetAll);

module.exports = router;