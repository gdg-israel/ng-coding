'use strict';

/* globals ngCoding: true */
var ngCoding = angular.module('gdg-israel.ng-coding', ['ui.router', 'ngCoding.leaderboard', 'ngCoding.services', 'urish.promisesToolkit', 'angularMoment']);

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
			})
			.state('prizes', {
				url: '/prizes',
				templateUrl: 'partials/prizes.html'
			});

		$urlRouterProvider.otherwise('/leaderboard');
	});
