'use strict';

angular.module('ngCoding.leaderboard', [])
		.controller('LeaderboardCtrl', function ($scope, User, $interval, moment) {
			var lastUpdatedOn = new Date();
        function update() {
            User.all()
					.then(function (users) {
						lastUpdatedOn = new Date();
						$scope.usersScore = users;
						// $scope.activities = User.pollActivities();
						$scope.gravatarUrl = function (hash) {
								return User.getGravatarUrl(hash, 40);
							};
						$scope.showActivity = function (activity) {
							if(angular.isDefined(activity)){
								return {
									content: activity.type +  ' @ ' + activity.repo.name,
									/* jshint camelcase:false */
									time: activity.created_at
									/* jshint camelcase:true */

								};
							}
						};
					});
			}

			update();
			var updateInterval = 30000;
			var timeToUpdateInterval = $interval(function () {
					$scope.lastUpdate = ((updateInterval/1000) - moment(new Date() - lastUpdatedOn).seconds()) + 's';
				}, 1000);
			var autoUpdateInterval = $interval(update, updateInterval);
			$scope.$on('$destory', function () {
				$interval.cancel(autoUpdateInterval);
				$interval.cancel(timeToUpdateInterval);
			});
		});
