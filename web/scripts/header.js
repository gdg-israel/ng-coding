'use strict';

ngCoding.controller('HeaderCtrl', function($scope, $window, User) {
		User.current().success(function (data,status) {
			console.log(data)
			var user = data.payload;
			localStorage.setItem("userId",user.userId)
			localStorage.setItem("username", user.username);
			$scope.user = user;
			$scope.userLoggedIn = User.isLoggedIn();

		}).error(function (user) {
			delete localStorage.userId
			delete localStorage.username
		$window.location.href = '/'
			console.log("redirecting")
			$scope.user = {username:"TestUser", score:50};
		})
});
