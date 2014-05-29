'use strict';

ngCoding.controller('HeaderCtrl', function($scope, User) {
		User.current().success(function (user) {
			console.log(arguments)
			$scope.user = user;
		}).error(function (user) {
			$scope.user = {username:"TestUser", score:50};
		})
});
