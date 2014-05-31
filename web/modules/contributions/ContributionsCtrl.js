'use strict';

module.exports = function ($scope, $http) {
	$http.get('/contributions').property('data').property('payload').assignTo($scope, 'contributions');
};

