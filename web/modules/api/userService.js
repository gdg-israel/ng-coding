'use strict';

module.exports = function ($http, $timeout, $q) {
	var usersCollection = [];
	return {
		isLoggedIn: function () {
			return angular.isDefined(localStorage.getItem('userId'));
		},
		current: function () {
			return $http.get('/user/current');
		},
		get: function (id) {
				var deferred = $q.defer();
				$http.get('users/' + id).then(function (res) {
						deferred.resolve(res.data.payload);
					});
				return deferred.promise;
			},
		all: function () {
			var deferred = $q.defer();
			$http.get('/leaderboard').then(function (res) {
				deferred.resolve(usersCollection = res.data.payload);
			});
			return deferred.promise;
		},
		getGravatarUrl: function (uId, size) {
			var suffix = (angular.isDefined(size)) ? 's=' + size : '';
			return 'http://www.gravatar.com/avatar/' + uId + '?' + suffix;
		},
		getProfileUrl: function (username) {
			return 'https://github.com/' + username;
		}
	};
};
