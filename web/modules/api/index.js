var moduleName = 'ngCoding.api';

angular.module(moduleName, [])
	.filter('githubActivity', require('./githubActivityFilter.js'))
	.factory('User', require('./userService'));

module.exports = moduleName;