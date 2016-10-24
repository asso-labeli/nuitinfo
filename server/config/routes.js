'use strict';

let Errors = require('../tools/routes/errors');
let fs = require('fs');

module.exports = function (app, config) {

    let files = fs.readdirSync(config.root + '/entities');

    for (let file of files) {
        require('../entities/' + file + '/' + file + '.model');
    }

    app.use('/api/application', require('../entities/application/application.routes'));
    app.use('/api/user', require('../entities/user/user.routes'));
    app.use('/api/team', require('../entities/team/team.routes'));

    app.use('/api/', require('../tools/routes/auth'));

    // All api/something go on 404 error if not found
    app.route('/:url(api)/*').get(Errors[404]);

    // Default route
    app.route('/*').get(Errors[404]);
};