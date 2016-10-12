'use strict';

let bcrypt = require('bcrypt');

function hashPassword(password, callback){
    return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS),
        callback);
}

function isPasswordGood(password, hash, callback){
    return bcrypt.compare(password, hash, callback);
}

module.exports = {
    hashPassword: hashPassword,
    isPasswordGood: isPasswordGood
};