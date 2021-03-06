var moduleName = 'ngCoding.contributions';

angular.module(moduleName, [
		'urish.promisesToolkit'
	])
	.constant('ContributionsView', require('./contributions.html'))
	.controller('ContributionsCtrl', require('./contributionsCtrl'))

	.constant('CreateContributionView', require('./createContribution.html'))
	.controller('CreateContributionCtrl', require('./createContributionCtrl'))

	.constant('ManageContributionView', require('./manageContribution.html'))
	.controller('ManageContributionCtrl', require('./manageContributionCtrl'));
module.exports = moduleName;
