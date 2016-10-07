'use strict';

let express = require('express');

let favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    passport = require('passport'),
    session = require('express-session');

module.exports = function (app, config) {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    app.use(compression());
    app.use(express.static(config.root + '/public'));

    app.use(session({
        secure: true, secret: config.secret,
        saveUninitialized: true, resave: true, cookie: {secure: true}
    }));

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use('/', express.static(config.root + '/../app'));
    app.use('/lib', express.static(config.root + '/../node_modules'));

    require('./routes')(app, config);

};