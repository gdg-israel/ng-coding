'use strict';
var mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = {
	currentUser: function (req, res) {
		var user = req.user;

		if (!user) {
			res.unauthorized('user is not logged-in');
			return;
		}

        res.ok(req.user);
    },
	leaderboard: function (req, res) {
		User.getAll()
			.then(function (allUsers) {
				res.ok(allUsers);
			});
	}
};