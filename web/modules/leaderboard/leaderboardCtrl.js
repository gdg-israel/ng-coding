'use strict';

module.exports = function ($scope, User, $interval) {
	var AUTO_UPDATE_INTERVAL = 30000;

	$scope.refresh = function () {
		User.all()
			.then(function (users) {
				$scope.usersScore = users;
			});
	};

	$scope.gravatarUrl = function (hash) {
		return User.getGravatarUrl(hash, 40);
	};

	$scope.refresh();

	var autoUpdateInterval = $interval($scope.refresh, AUTO_UPDATE_INTERVAL);
	$scope.$on('$destory', function () {
		$interval.cancel(autoUpdateInterval);
	});
};
