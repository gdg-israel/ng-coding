'use strict';

module.exports = function ($scope, $window, User) {
	User.current()
		.success(function (data) {
			var user = data.payload;
			localStorage.setItem('userId', user.userId);
			localStorage.setItem('username', user.username);
			$scope.user = user;
			$scope.userLoggedIn = User.isLoggedIn();
		}).error(function () {
			delete localStorage.userId;
			delete localStorage.username;
			$window.location.href = '/';
		});
};
