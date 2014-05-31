var moduleName = 'ngCoding.leaderboard';

angular.module(moduleName, [
		require('../api')
	])
	.constant('LeaderboardView', require('./leaderboard.html'))
	.controller('LeaderboardCtrl', require('./leaderboardCtrl'));

module.exports = moduleName;