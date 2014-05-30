'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	promiseIt = require('promise-it'),
	passport = require('passport');

passport.serializeUser(function (user, done) {
	delete user.accessToken;

	done(null, user);
});

passport.deserializeUser(function (user, done) {
	delete user.accessToken;

	done(null, user);
});

function persistUser(user) {
	return promiseIt(user.save, [], user);
}

function instantiateUser(accessToken, profile) {
	/* jshint camelcase:false*/
	var gravatarId = profile._json.gravatar_id;
	/* jshint camelcase:true*/

	return new User({
		accessToken: accessToken,
		username: profile.username,
		fullName: profile.displayName,
		email: profile._json.email || null,
		company: profile.company,
		gravatarId: gravatarId,
		githubUserId: profile.id,
		score: 10
	});
}

function saveUser(accessToken, profile) {
	return persistUser(instantiateUser(accessToken, profile));
}

module.exports = function (accessToken, refreshToken, profile, done) {

	function complete(user) {
		if (Array.isArray(user)) {
			user = user[1];
		}

		done(null, user.toObject());
	}

	User.findOneByUsername(profile.username)
		.then(function (doc) {
			if (doc) {
				complete(doc);
			}

			saveUser(accessToken, profile).then(complete);
		});
};

