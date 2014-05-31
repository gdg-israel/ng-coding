'use strict';

ngCoding
	.filter('githubActivity', function () {
		return function (activity) {
			if (activity) {
				return activity.type.replace(/Event$/, '');
			}
			return '';
		};
	});
