'use strict';

angular.module('ngCoding.leaderboard', [])
	.controller('LeaderboardCtrl', function ($scope, User) {
			User.all().then(function (users) {
				$scope.usersScore = users;
			});
	})
