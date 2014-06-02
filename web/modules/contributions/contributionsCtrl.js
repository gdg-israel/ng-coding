'use strict';

module.exports = function ($scope, $http, $interval) {
	var userId = localStorage.getItem('userId');

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
	$scope.assignMe = function (issue) {
		$http.put('/contributions/' + issue.contributionId,{assignUser:true}).then(function () {
			$scope.update();
		});
	};
	$scope.unassignMe = function (issue) {
		$http.put('/contributions/' + issue.contributionId,{unassignUser:true}).then(function () {
			$scope.update();
		});
	};
	$scope.userAssigned = function (contribution) {
			var assigned = false;
			angular.forEach(contribution.assignees, function (assign) {
				if(assign.userId === userId){
					assigned = true;
					return assigned;
				}
			});
			return assigned;
		};
	$scope.isWinner = function (contribution) {
			var isWinner = false;
			angular.forEach(contribution.winners, function (winner) {
				if(winner=== userId){
					isWinner = true;
					return true;
				}
			});
			return isWinner;
		};
	$scope.update();
	var refreshInterval = $interval(function () {
		$scope.update();
	}, 20000);
	$scope.$on('$destroy', function () {
		$interval.cancel(refreshInterval);
	});
	$scope.$on('contributions:refresh', $scope.update);
};
