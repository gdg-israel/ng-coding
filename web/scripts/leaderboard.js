'use strict';

angular.module('ngCoding.leaderboard', [])
		.controller('LeaderboardCtrl', function ($scope, User, $interval) {
				User.all()
					.success(function (data, status) {

						var rawData = data.payload;
						$scope.usersScore = rawData;
						$scope.activities = User.pollActivities();
						$scope.gravatarUrl = function (hash) {
								return User.getGravatarUrl(hash, 40);
						}
					})
					.error(function (data, status) {
						});
			});
