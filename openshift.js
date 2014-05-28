'use strict';

var express = require('express');
var app = express();

var SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/web'));

app.listen(SERVER_PORT, SERVER_IP, function () {
	console.log('%s: Node server started on %s:%d ...',
		Date(Date.now()), SERVER_IP, SERVER_PORT);
});
