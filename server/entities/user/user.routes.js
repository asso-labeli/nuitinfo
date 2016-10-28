'use strict';

let express = require('express');
let User = require('mongoose').model('User');
let passport = require('passport');

let router = express.Router();

router.post('/', User.exCreate);
router.put('/', User.exEdit);
router.get('/me', User.exGetLoggedUser);
router.get('/:id', User.exGet);
router.get('/', User.exGetAll);

module.exports = router;