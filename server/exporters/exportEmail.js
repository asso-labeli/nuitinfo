'use strict';

let express = require('express'),
	config = require('../config/config'),
	mongoose = require('mongoose');

let app = express();

// Load process.env
let envConf = require('../config/local.env.js');

for (let key in envConf) {
	if (envConf.hasOwnProperty(key)){
		process.env[key] = envConf[key];
	}
}

require('../config/express')(app, config);

function getMongoURI(){
	let uri = 'mongodb://';

	if (process.env.MONGO_USER && process.env.MONGO_USER !== 'undefined'){
		uri += process.env.MONGO_USER;

		if (process.env.MONGO_PASSWORD && process.env.MONGO_PASSWORD !== 'undefined'){
			uri += ':' + process.env.MONGO_PASSWORD + '@';
		}
	}

	uri += process.env.MONGO_HOST;

	if (process.env.MONGO_PORT){
		uri += ':' + process.env.MONGO_PORT;
	}

	if (process.env.MONGO_DB){
		uri += '/' + process.env.MONGO_DB;
	}

	return uri;
}

mongoose.connect(getMongoURI());

let db = mongoose.connection;
db.on('error', (err) => {
	console.error('Mongoose error : ', err);
});

db.once('open', function() {
	console.log('Database connected on', process.env.MONGO_DB);
});

require('../entities/user/user.controller');

mongoose.model('User').find({}).select('firstName lastName email').exec((err, users) => {
	if (err){
		return console.error(err);
	}

	console.log('Nom;Prénom;Email');

	for (let user of users){
		console.log(user.lastName + ';' + user.firstName + ';' + user.email);
	}

	mongoose.connection.close();
});