'use strict';

let express = require('express');
let Institution = require('mongoose').model('Institution');

let router = express.Router();

router.post('/', Institution.exCreate);
router.get('/', Institution.exGet);

module.exports = router;