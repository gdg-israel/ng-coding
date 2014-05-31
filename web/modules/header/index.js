var moduleName = 'ngCoding.header';

angular.module(moduleName, [
		'angularMoment',
		'urish.promisesToolkit',
		require('../api')
	])
	.constant('HeaderView', require('./header.html'))
	.controller('HeaderCtrl', require('./headerCtrl'))
	.run(function ($templateCache, HeaderView) {
		$templateCache.put('header.html', HeaderView);
	});

module.exports = moduleName;