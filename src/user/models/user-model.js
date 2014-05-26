'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    q = require('Q');

/**
 * User model
 * @type {Schema}
 */
var User = new Schema({

    username: {
        type: String,
        required: true,
        validate: /^.{4,10}.$/,
        index: {
            unique: true
        }
    },

    email: {
        type: String,
        required: true,
        validate: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        set: function(email) {
            return email.toLowerCase();
        },
        index: {
            unique: true
        }
    },

    accessToken: {
        type: String
    },

    refreshToken: {
        type: String
    }

}, { versionKey: false, id: false });

/**
 * Returns a promise and executes the given func with exec
 * @param {function} func
 * @returns {q.promise}
 */
function promise(func) {
    var defer = q.defer();

    func.exec(function(err, doc) {
        if (err) {
            defer.reject(err);
            return;
        }

        defer.resolve(doc);
    });

    return defer.promise;
}

/**
 * Match the password
 * @param {string} password
 * @returns {q.promise}
 */
User.methods.isPasswordValid = function(password) {
    return passwordWrapper.match(password, this.password);
};

/**
 * Returns a user doc by username
 * @param {string} username
 * @returns {q.promise}
 */
User.statics.findOneByUsername = function(username) {
    return promise(this.findOne({ username: username }));
};

/**
 * Returns a user doc by email
 * @param {string} email
 * @returns {q.promise}
 */
User.statics.findOneByEmail = function(email) {
    return promise(this.findOne({ email: email }));
};

/**
 * Virtual getter for the userId property
 */
User.virtual('userId')
    .get(function() {
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
User.options.toObject.transform = function(doc, ret, options) {
    delete ret._id;
    delete ret.password;
};

mongoose.model('User', User);
