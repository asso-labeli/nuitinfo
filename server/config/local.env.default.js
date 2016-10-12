'use strict';

/* Rename this file into local.env.js to add the configuration to server */

module.exports = {
    MONGO_HOST: 'localhost',
    MONGO_PORT: 27017,
    MONGO_DB: 'nuitinfo',

    MAIL_SERVICE: 'custom',
    MAIL_ADDRESS: 'email@default.com',
    MAIL_PASSWORD: 'password',

    API_URL: 'http://localhost:8080',
    WEBSERVER_URL: 'http://localhost:8080',

    JWT_SECRET: 'bJC2rlw0IW7XcsV5pWrFvcAK86y9JMD4L8JLB75BBmFJ00heK6yXtXMPDglcrZhl',

    BCRYPT_SALT_ROUNDS: 10
};