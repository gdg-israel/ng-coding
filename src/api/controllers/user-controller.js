'use strict';
var User = require('../../user/models/user-model');

module.exports = {
    currentUser: function(req, res) {
        var user = req.user;

        if (!req.user) {
            res.unauthorized('user is not logged-in');
            return;
        }

        res.ok(req.user);
    },
    all: function (req, res) {
        User.find().exec().then(function (users) {
            res.ok(users);
        });
    }
};
