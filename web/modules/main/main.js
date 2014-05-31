'use strict';

angular
	.module('ngCoding.main', [
		'ui.router',
		require('../leaderboard'),
		require('../contributions'),
		require('../header')
	])
	.config(function ($stateProvider, $urlRouterProvider, LeaderboardView, ContributionsView) {
		$stateProvider
			.state('leaderboard', {
				url: '/leaderboard',
				template: LeaderboardView,
				controller: 'LeaderboardCtrl'
			})
			.state('contributions', {
				url: '/contributions',
				template: ContributionsView,
				controller: 'ContributionsCtrl'
			})
			.state('prizes', {
				url: '/prizes',
				template: require('./prizes.html')
			});

		$urlRouterProvider.otherwise('/leaderboard');
	});
