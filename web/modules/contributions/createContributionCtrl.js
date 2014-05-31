'use strict';

module.exports = function ($scope, $http) {
	function createContribution() {
		return  {
			title: '',
			description: 'none',
			link: '',
			complexityLevel: 1
		};
	}

	$scope.newContribution = createContribution();

	$scope.createContribution = function () {
		$scope.newContribution.score = $scope.newContribution.complexityLevel * 10;
		$http.post('/contributions', $scope.newContribution).then(function () {
			$scope.$emit('contributions:refresh');
			$scope.newContribution = createContribution();
		});
	};
};