'use strict';

module.exports = function () {
	return function (activity) {
		if (activity) {
			return activity.type.replace(/Event$/, '');
		}
		return '';
	};
};
