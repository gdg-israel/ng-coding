'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
var _ = require('underscore');


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

	var job = new CronJob('*/5 * * * * *', function () {
				var User = mongoose.model('User');
				User.getAll().then(function(users){
					_.each(users, function(user){
								user.fetchGithubEvents().then(function (events) {
									var accumScore = 0, filteredEvents = filterRelevantEvent(events);
									user.setLastActivity(events[0]);
									_.each(filteredEvents, function (event) {
												accumScore+= calcScore(event);
											});

									user.updateScore(accumScore).then(function (res, error) {
										if(res)
											console.log('updateScore result: ' + res);
									});
								});
							});
				});
			}, null, true);

	return app;
};
var contestTerms = require('../config/contestTerms');
function filterRelevantEvent(events) {
	return _.filter(events, function (event) {
			return _.has(contestTerms.repos, event.repo.name);
		});
}
function calcScore(event) {
		return contestTerms.score[event.type];
	}
// var updateUserEvents= function (user, events) {
// 		Events.update({userId: user._id},{$addToSet:{scoredEvents: {$each: events}}}, function (res, error) {
// 			//TODO: Write error to log ...
// 			if(error)
// 				console.log(error);
// 		});
// 	};
