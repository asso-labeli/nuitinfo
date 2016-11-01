'use strict';

let Errors = require('../tools/routes/errors');
let express = require('express');
let fs = require('fs');

module.exports = function (app, config) {
    let files = fs.readdirSync(config.root + '/entities');

    for (let file of files) {
        require('../entities/' + file + '/' + file + '.model');
    }

    app.use('/api/application', require('../entities/application/application.routes'));
    app.use('/api/institution', require('../entities/institution/institution.routes'));
    app.use('/api/user', require('../entities/user/user.routes'));
    app.use('/api/team', require('../entities/team/team.routes'));

    app.use('/api/', require('../tools/routes/auth'));
    app.use('/api/statistics', require('../tools/routes/statistics'));

    // All api/something go on 404 error if not found
    app.route('/api/*').get(Errors[404]);

    // Default route
    app.use('/dist', express.static(config.root + '/../app/dist'));
    app.use('/src', express.static(config.root + '/../app/src'));
    app.use('/*', express.static(config.root + '/../app'));
};