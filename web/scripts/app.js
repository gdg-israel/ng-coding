'use strict';

/* globals ngCoding: true */
var ngCoding = angular.module('gdg-israel.ng-coding', ['ui.router']);

ngCoding
	.config(function ($stateProvider) {
		$stateProvider
			.state('index', {
				url: '',
				templateUrl: 'partials/login.html'
			})
			.state('leaderboard', {
				url: '/leaderboard',
				templateUrl: 'partials/leaderboard.html',
				controller: 'LeaderboardCtrl'
			})
			.state('contributions', {
				url: '/contributions',
				templateUrl: 'partials/contributions.html'
			});
	});
