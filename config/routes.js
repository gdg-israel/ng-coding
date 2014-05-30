'use strict';
var passport = require('passport'),
    userController = require('../src/api/controllers/user-controller');

module.exports = function(app){

//    app.get('/user/:username', userController.user);

    app.get('/user/current', userController.currentUser);
    app.get('/user/all', userController.all);
//
//    app.post('/user', userController.registerUser);
//
//    app.get('/leaderboard');
//
//    app.get('/contributions')
//
//    app.put('/contributions/:contibId')

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
        function(req, res) {
            // Successful authentication, redirect to the thank you page.
            res.redirect('/hack');
        });
    app.get('/hack', function (req, res) {
      // console.log(express.static(__dirname))
        res.sendfile('./web/hack.html');
    });
};
