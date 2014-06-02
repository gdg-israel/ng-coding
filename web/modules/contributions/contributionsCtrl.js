'use strict';

module.exports = function ($scope, $http, $interval, Contribution) {
	var userId = localStorage.getItem('userId');
	function containsUserId(collection) {
		var contains = false;
		angular.forEach(collection, function (item) {
			if(item.userId === userId || item === userId){
				contains = true;
				return contains;
			}
		});
		return contains;
	}
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
		Contribution.assignUser(issue).then(function () {
			$scope.update();
		});
	};
	$scope.unassignMe = function (issue) {
		Contribution.unassignUser(issue).then(function () {
			$scope.update();
		});
	};
	$scope.userAssigned = function (contribution) {
			return containsUserId(contribution.assignees);
		};
	$scope.userFinished = function (contribution) {
		return containsUserId(contribution.finished);
	};
	$scope.finish = function (contribution) {
				Contribution.assignedtoFinished(contribution).then(function () {
					$scope.update();
				});
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
