'use strict';

module.exports = function ($scope, $http) {
	$scope.update = function () {
		$http.get('/contributions').property('data').property('payload').assignTo($scope, 'contributions');
	};

	$scope.update();
	$scope.$on('contributions:refresh', $scope.update);
};

