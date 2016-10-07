'use strict';

let path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

let config = {
    development: {
        root: rootPath,
        app: {
            name: 'tuviens-api-dev'
        },
        port: 15400,
        secret: 'development-session-nuitinfo-lamantin'
    },

    test: {
        root: rootPath,
        app: {
            name: 'tuviens-api-test'
        },
        port: 15400,
        secret: 'test-session-nuitinfo-lamantin'
    },

    production: {
        root: rootPath,
        app: {
            name: 'tuviens-api'
        },
        port: 15400,
        secret: 'prod-session-nuitinfo-lamantin'
    }
};

module.exports = config[env];