'use strict';

var mongoose = require('mongoose');
var config = require('../config/config');
var _ = require('underscore');
require('./user/models/user-model');

mongoose.connect(config.db);

var User = mongoose.model('User');

User.getAll().then(function (users) {
	_.each(users, function (user) {
		user.fetchGithubEvents().then(function (events) {
			user.setLastActivity(events[0]);
		});
	});
});
