'use strict';
var passport = require('passport');

module.exports = function(app){

//    app.get('/user/:username', userController.getUser);
//
//    app.get('/user/current', userController.getCurrentUser);
//
//    app.post('/user', userController.registerUser);
//
//    app.get('/leaderboard');
//
//    app.get('/contributions')
//
//    app.put('/contributions/:contibId')

    app.get('/auth/github',
        passport.authenticate('github'));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });


};
