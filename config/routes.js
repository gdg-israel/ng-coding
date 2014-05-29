'use strict';
var passport = require('passport'),
    userController = require('../src/api/controllers/user-controller');

module.exports = function(app){

//    app.get('/user/:username', userController.user);

    app.get('/user/current', userController.currentUser);
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
            // Successful authentication, redirect home.
            res.redirect('/');
        });


};
