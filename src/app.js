'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');

var config = require('../config/config');

var modulesPath = __dirname;

module.exports = function () {
	var app = express();

	mongoose.connect(config.db);
	var db = mongoose.connection;

	db.on('error', function () {
		throw new Error('unable to connect to database at ' + config.db);
	});


	fs.readdirSync(modulesPath).forEach(function (dir) {
		var dirPath = path.join(modulesPath, dir);
		if (dir.indexOf('.') === -1 && fs.lstatSync(dirPath).isDirectory()) {
			require(dirPath);
		}
	});

	app.use(express.static('web'));
	app.use(function(req,res,next){
		req.db = db;
		next();
	});
	require('../config/express')(app, config);
	require('../config/routes')(app);

	return app;
};
