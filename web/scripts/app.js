angular
	.module('gdg-israel.ng-coding', ['ui.router'])
	.config(function ($stateProvider) {
		$stateProvider
			.state('index', {
				url: "",
				templateUrl: "partials/login.html"
			})
			.state('leaderboard', {
				url: "/leaderboard",
				templateUrl: "partials/leaderboard.html"
			})
			.state('contributions', {
				url: "/contributions",
				templateUrl: "partials/contributions.html"
			});
	});
