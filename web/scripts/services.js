'use strict';
angular.module('ngCoding.services', [])
	.factory('User', function ($http) {
		var usersBuffer = 0;
		return {
			isLoggedIn: function () {
				return angular.isDefined(localStorage.getItem('userId'));
			},
			current: function () {
				return $http.get('/user/current');
			},
			all: function () {
				var promise = $http.get('user/all?next=' + usersBuffer);
				promise.finally(function () {
					usersBuffer += 10;
				});
				return promise;
			},
			getGravatarUrl: function (hash, size) {
				var suffix = (angular.isDefined(size)) ? ('s=' + size) : '';
				return 'http://www.gravatar.com/avatar/' + hash + '?' + suffix;
			},
			getProfileUrl: function (username) {
				return 'https://github.com/' + username;
			}
		};
	});
