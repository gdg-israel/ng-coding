'use strict';

var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
var _ = require('underscore');

var contestTerms = require('../../config/contestTerms');
function calcScore(event) {
	return contestTerms.score[event.type];
}

function filterRelevantEvent(events) {
	return _.filter(events, function (event) {
		return _.has(contestTerms.repos, event.repo.name);
	});
}

function fetchUsersJob() {
	var User = mongoose.model('User');
	User.getAll().then(function (users) {
		_.each(users, function (user) {
			user.fetchGithubEvents().then(function (events) {
				var accumScore = 0, filteredEvents = filterRelevantEvent(events);
				user.setLastActivity(events[0]);
				_.each(filteredEvents, function (event) {
					accumScore += calcScore(event);
				});
				if (accumScore >= 10) {
					user.updateScore(accumScore).then(function (res) {
						console.log('updateScore result: ', res);
					});
				}
			});
		});
	});
}

module.exports = new CronJob('*/2 * * * *', fetchUsersJob, null, true);
