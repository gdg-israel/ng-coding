'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	q = require('q');

/**
 * User model
 * @type {Schema}
 */
var User = new Schema({

	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},

	fullName: {
		type: String
	},

	email: {
		type: String,
		set: function (email) {
			if (!email) {
				return '';
			}

			return email.toLowerCase();
		},
		index: {
			unique: true
		}
	},

	accessToken: {
		type: String,
		required: true
	},

	company: {
		type: String
	},

	gravatarId: {
		type: String
	},

	githubUserId: {
		type: String,
		required: true
	},

	score: {
		type: Number,
		required: true
	}

}, { versionKey: false, id: false });

/**
 * Returns a promise and executes the given func with exec
 * @param {function} func
 * @returns {q.promise}
 */
function promise(func) {
	var defer = q.defer();

	func.exec(function (err, doc) {
		if (err) {
			defer.reject(err);
			return;
		}

		defer.resolve(doc);
	});

	return defer.promise;
}

/**
 * Returns a user doc by username
 * @param {string} username
 * @returns {q.promise}
 */
User.statics.findOneByUsername = function (username) {
	return promise(this.findOne({ username: username }));
};

/**
 * Returns a user doc by email
 * @param {string} email
 * @returns {q.promise}
 */
User.statics.findOneByEmail = function (email) {
	return promise(this.findOne({ email: email }));
};

/**
 * Returns a list of all users
 */
User.statics.getAll = function () {
	return promise(this.find({}));
};

/**
 * Virtual getter for the userId property
 */
User.virtual('userId')
	.get(function () {
		return this._id;
	});

/**
 * Set virtuals during toObject serialization
 */
User.set('toObject', {
	virtuals: true
});

/**
 *
 * @param doc
 * @param ret
 * @param options
 */
User.options.toObject.transform = function (doc, ret) {
	delete ret._id;
	delete ret.password;
};

mongoose.model('User', User);
