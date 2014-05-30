'use strict';
angular.module('ngCoding.services', [])
	.factory('User', function ($http) {
		return {
			isLoggedIn: function () {
				return angular.isDefined(localStorage.getItem('userId'));
			},
			current: function () {
				return $http.get('/user/current');
			},
			all: function () {
				return $http.get('/leaderboard').then(function(response) {
					return response.data.payload;
				});
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
