'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	q = require('q'), https = require('https');

var config = require('../../../config/config');

/**
 * User model
 * @type {Schema}
 */
// var contributionSchema = new Schema({
// 	// contributionId:{
// 	// 		type: String,
// 	// 		index:{
// 	// 			unique:true
// 	// 		}
// 	// 	},
//
// 	});
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
	},

	lastActivity: {
		type: Object
	},
	contributions:{
		type:[{score: Number }]
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
User.statics.findOneById = function (id) {
	return promise(this.findOne({ _id: id }));
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

function sendRequest(options, callback){
		var req = https.request(options, function (resp) {
				var raw = '';
				resp.on('data', function (chunk) {
					raw += chunk;
				});
				resp.on('end', function () {
					var data = JSON.parse(raw);
					callback(data);
				});
			});
		req.on('error',function (error) {
			console.log(error);
		});
		req.end();
	}

User.methods.fetchGithubEvents = function () {
		var self = this;
		var deferred = q.defer();
		var options = {
				host: 'api.github.com',
				port: 443,
				path: '/users/' + self.username + '/events?client_id=' + config.github.clientId + '&client_secret=' + config.github.clientSecret,
				method: 'GET',
				headers: {
						'User-Agent': config.app.name,
						'Content-Type': 'application/json'
					}
				};
		sendRequest(options, function (events){
				deferred.resolve(events);
			});
		return deferred.promise;
	};

User.methods.updateScore = function (score) {
		var deferred = q.defer();
		this.model('User').update({_id:this.userId}, {$set:{score: score}}, function (err, res) {
			if(err){
				console.log('error '+ err);
			}
			deferred.resolve(res);
		});
		return deferred.promise;
	};

User.methods.setLastActivity = function (activity) {
	this.model('User').update({_id:this.userId}, {$set:{lastActivity: activity}}, function (err) {
		if(err){
			console.log(err);
		}
	});
};



module.exports = mongoose.model('User', User);
