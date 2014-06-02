'use strict';

var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
var _ = require('underscore'),  contributionRepo = require('../contributions/lib/contribution-repository');

// var contestTerms = require('../../config/contestTerms');
// function calcScore(event) {
// 	return contestTerms.score[event.type];
// }
//
// function filterRelevantEvent(events) {
// 	return _.filter(events, function (event) {
// 		return _.has(contestTerms.repos, event.repo.name);
// 	});
// }

function fetchUsersJob() {
	var User = mongoose.model('User');
	User.getAll().then(function (users) {
			_.each(users, function (user) {
					var accumScore = 0;
					_.each(user.contributions, function (contrib) {
						accumScore += contrib.score;
					});
					if (accumScore >= 10) {
						user.updateScore(accumScore).then(function (res) {
								console.log('updateScore result: ', res);
							});
					}
					user.fetchGithubEvents().then(function (events) {
						user.setLastActivity(events[0]);
					});
				});
		});
}
function fetchContributionsJob() {
		var User = mongoose.model('User');
		contributionRepo.listAll().then(function (contributions) {
			_.each(contributions, function (contrib) {
				var contribWon = {_id:contrib.contributionId, score: contrib.score};
				_.each(contrib.winners, function (winner) {
					User.update({_id:winner},{$addToSet:{contributions:contribWon}},{upsert:true}, function (err) {
						if(err){
							console.log(err);
						}
					});
				});
			});
		});
	}
module.exports ={
	fetchContributionsJob: new CronJob('*/20 * * * * *', fetchContributionsJob, null, true),
	fetchUsersJob: new CronJob('*/2 * * * *', fetchUsersJob, null, true)
};
