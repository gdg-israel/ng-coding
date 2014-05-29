'use strict';

module.exports = {
    currentUser: function(req, res) {
        var user = req.user;

        if (!req.user) {
            res.unauthorized('user is not logged-in');
            return;
        }

        res.ok(req.user);
    }
};