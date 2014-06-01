'use strict';

module.exports = function ($scope, $http) {
	$scope.update = function () {
		$http.get('/contributions').property('data').property('payload').assignTo($scope, 'contributions');
	};

	$scope.sort = {
		field: 'title',
		ascending: true
	};

	$scope.setSort = function (field) {
		$scope.sort.ascending = ($scope.sort.field !== field) || !$scope.sort.ascending;
		$scope.sort.field = field;
	};

	$scope.update();
	$scope.$on('contributions:refresh', $scope.update);
};

