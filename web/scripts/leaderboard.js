'use strict';

angular.module('ngCoding.leaderboard', [])
		.controller('LeaderboardCtrl', function ($scope, User, $interval) {
			var lastUpdatedOn = new Date();
        function update() {
            User.all()
					.then(function (users) {
						lastUpdatedOn = new Date();
						$scope.usersScore = users;
						// $scope.activities = User.pollActivities();
						$scope.gravatarUrl = function (hash) {
								return User.getGravatarUrl(hash, 40);
						},
						$scope.showActivity = function (activity) {
							console.log(activity);
							return {content: activity.type +  ' @ Repo ' + activity.repo.name, time: moment(activity.created_at).fromNow()}
						}
					});
				}
				update();
				var updateInterval = 30000;
				$interval(function () {
						$scope.lastUpdate = ((updateInterval/1000) -moment(new Date() - lastUpdatedOn).seconds()) + "s";
				}, 1000);
				var autoUpdateInterval = $interval(update, updateInterval);
				$scope.$on('$destory', function () {
					$interval.cancel(autoUpdateInterval);
				});
	});
