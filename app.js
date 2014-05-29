'use strict';

var config = require('./config/config'),
	express = require('express'),
	cluster = require('cluster'),
	numCPUs = require('os').cpus().length;

/**
 * Bootstrapping service
 */
(function () {

	/**
	 * Fork processes on production environment
	 */
	var i;

	if (cluster.isMaster && express().get('env') !== 'development') {
		for (i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		cluster.on('exit', function (worker) {
			console.log('worker ' + worker.process.pid + ' died');
			cluster.fork();
		});

		return;
	}

	var app = require('./src/app')();

	app.listen(config.port, function () {
		console.log('server is listening to port ' + config.port);
	});
}());
