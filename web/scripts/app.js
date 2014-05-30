'use strict';

/* globals ngCoding: true */
var ngCoding = angular.module('gdg-israel.ng-coding', ['ui.router', 'ngCoding.leaderboard', 'ngCoding.services']);

ngCoding
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			// .state('',{
			// 	url:'/hack',
			// 	templateUrl:'hack.html',
			// 	controller: function () {
			//
			// 	}
			// })
			.state('leaderboard', {
				url: '/leaderboard',
				templateUrl: 'partials/leaderboard.html',
				controller: 'LeaderboardCtrl'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'partials/login.html',
				controller: function ($scope,$location, User) {
					if (User.isLoggedIn){
						console.log("logged in")
						$location.path('/leaderboard')
					}
				}
			})
			.state('contributions', {
				url: '/contributions',
				templateUrl: 'partials/contributions.html'
			});

			$urlRouterProvider.otherwise('/leaderboard')
	});
