var moduleName = 'ngCoding.contributions';

angular.module(moduleName, [
		'urish.promisesToolkit'
	])
	.constant('ContributionsView', require('./contributions.html'))
	.controller('ContributionsCtrl', require('./contributionsCtrl'));

module.exports = moduleName;