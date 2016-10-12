'use strict';

let express = require('express'),
    config = require('./config/config'),
    mongoose = require('mongoose');

let app = express();

// Load process.env
let envConf = require('./config/local.env');

for (let key in envConf) {
    if (envConf.hasOwnProperty(key)){
        process.env[key] = envConf[key];
    }
}

require('./config/express')(app, config);

mongoose.connect('mongodb://' + process.env.MONGO_HOST + ':' +
    process.env.MONGO_PORT + '/' + process.env.MONGO_DB);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database connected');
});

app.listen(8080, function() {
    console.log('Server listening on port 8080 !');
});