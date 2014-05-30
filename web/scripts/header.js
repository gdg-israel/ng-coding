'use strict';

ngCoding.controller('HeaderCtrl', function($scope, User) {
		User.current().success(function (data,status) {
			console.log(data)
			var user = data.payload;
			localStorage.setItem("userId",user.userId)
			localStorage.setItem("username", user.username);
			$scope.user = user;
			$scope.userLoggedIn = User.isLoggedIn();

		}).error(function (user) {
			$scope.user = {username:"TestUser", score:50};
		})
});
