'use strict';

angular.module('ngCoding.leaderboard', [])
	.controller('LeaderboardCtrl', function ($scope, User, $interval) {
		function update() {
			User.all()
				.then(function (users) {
					$scope.usersScore = users;
					$scope.activities = User.pollActivities();
					$scope.gravatarUrl = function (hash) {
						return User.getGravatarUrl(hash, 40);
					};
				});
		}

		update();
		var autoUpdateInterval = $interval(update, 30000);
		$scope.$on('$destory', function () {
			$interval.cancel(autoUpdateInterval);
		});
	});
