'use strict';
var moduleName = 'ngCoding.api';

angular.module(moduleName, [])
	.filter('githubActivity', require('./githubActivityFilter.js'))
	.filter('contribFinished', function () {
			return function (isFinished){
				if (isFinished){
					return 'finished';
				}
				return 'I Finish!';
			};
		})
	.factory('User', require('./userService'))
	.factory('Contribution', require('./contributionService'));

module.exports = moduleName;
