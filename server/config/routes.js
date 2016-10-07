'use strict';

let Errors = require('../tools/routes/errors');
let fs = require('fs');

module.exports = function (app, config) {

    let files = fs.readdirSync(config.root + '/entities');

    for (let file of files) {
        require('../entities/' + file + '/' + file + '.model');
    }

    // All api/something go on 404 error if not found
    app.route('/:url(api)/*').get(Errors[404]);

    // Default route
    app.route('/*').get(Errors[404]);
};