'use strict';
angular.module('ngCoding.services', [])
  .factory('User', function ($http, $timeout) {
        var usersBuffer = 0;
        var usersCollection = [];
        var activities = {};
        var pollActivities = function () {
            angular.forEach(usersCollection, function (user) {
                $http.get('https://api.github.com/users/' + user.username + '/events').success(function (res) {
                    var userActivities = res;
                    var lastActivity = userActivities[0];
                    activities[user._id] = {content: lastActivity.type +  ' @ Repo ' + lastActivity.repo.name, time: moment(lastActivity.created_at).format('MMMM Do YYYY, h:mm:ss a')};
                });
            });
            $timeout(pollActivities, 10000);
        };
        pollActivities();
        return {
            isLoggedIn: function () {
                return angular.isDefined(localStorage.getItem('userId'));
            },
            current: function () {
                return $http.get('/user/current');
            },
            all: function () {
                var promise = $http.get('user/all?next='+usersBuffer);
                promise.then(function (res) {
                    usersBuffer+=10;
                    usersCollection = res.data.payload;
                });
                return promise;
            },
            getGravatarUrl: function (uId, size) {
                var suffix = (angular.isDefined(size))? 's=' + size: '';
                return 'http://www.gravatar.com/avatar/' + uId + '?' + suffix;
            },
            getProfileUrl: function (username) {
                return 'https://github.com/' + username;
            },
            pollActivities: function() {
                return activities;
            }
        };
    });
