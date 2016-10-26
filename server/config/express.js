'use strict';

let express = require('express');

let favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    passport = require('passport');

let passportConfiguration = require('./passsport');

module.exports = function (app, config) {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    app.use(compression());

    app.use(passport.initialize());

    app.use(function(req, res, next) {
        req.isLogged = () => passportConfiguration.isLogged(req);

        passport.authenticate('jwt-custom', function(err, user) {
            if (err){
                next();
            }

            if (user){
                req.user = user;
            }

            next();
        })(req, res, next);
    });

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    });

    require('./routes')(app, config);
};