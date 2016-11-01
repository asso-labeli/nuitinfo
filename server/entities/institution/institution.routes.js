'use strict';

let express = require('express');
let Institution = require('mongoose').model('Institution');

let router = express.Router();

router.post('/', Institution.exCreate);

module.exports = router;