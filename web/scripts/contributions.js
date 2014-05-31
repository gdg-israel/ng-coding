'use strict';

angular.module('ngCoding.contributions', [])
	.controller('ContributionsCtrl', function ($scope, $http) {
		$http.get('/contributions').property('data').property('payload').assignTo($scope, 'contributions');
	});
