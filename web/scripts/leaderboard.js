'use strict';

angular.module('ngCoding.leaderboard', [])
	.controller('LeaderboardCtrl', function ($scope, $interval, User) {
		$scope.usersScore = [];

		function update() {
			User.all().assignTo($scope, 'usersScore');
		}

		update();

		var autoUpdateInterval = $interval(update, 30000);
		$scope.$on('$destory', function () {
			$interval.cancel(autoUpdateInterval);
		});
	});
