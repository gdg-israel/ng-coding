'use strict';

/* globals ngCoding: true */
var ngCoding = angular.module('gdg-israel.ng-coding', ['ui.router', 'ngCoding.leaderboard', 'ngCoding.services']);

ngCoding
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('leaderboard', {
				url: '/leaderboard',
				templateUrl: 'partials/leaderboard.html',
				controller: 'LeaderboardCtrl'
			})
			.state('contributions', {
				url: '/contributions',
				templateUrl: 'partials/contributions.html'
			});

		$urlRouterProvider.otherwise('/leaderboard');
	});
