'use strict';

angular.module('ngCoding.leaderboard', [])
	.controller('LeaderboardCtrl', function ($scope, User) {
		User.all()
			.then(function (users) {
				$scope.usersScore = users;
			})
			.catch(function () {
				$scope.usersScore = [
					{
						userId: 551,
						username: 'liorr',
						score: 551,
						gravatarUrl: User.getGravatarUrl('92ccd542327064bf08d3797c3f291329', 40),
						lastActivity: {
							content: 'Commited to angular-fire',
							time: '14:10'
						}
					}
				];
			});
	});
