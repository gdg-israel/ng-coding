'use strict';

angular
	.module('ngCoding.main', [
		'ui.router',
		require('../leaderboard'),
		require('../contributions'),
		require('../header')
	])
	.config(function ($stateProvider, $urlRouterProvider, LeaderboardView, ContributionsView, CreateContributionView) {
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
			.state('contributions.create', {
				url: '/create',
				template: CreateContributionView,
				controller: 'CreateContributionCtrl'
			})
			.state('prizes', {
				url: '/prizes',
				template: require('./prizes.html')
			})
			.state('rules', {
				url: '/rules',
				template: require('./rules.html')
			});

		$urlRouterProvider.otherwise('/leaderboard');
	});
