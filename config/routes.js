'use strict';
var passport = require('passport'),
    userController = require('../src/user/controllers/user-controller'),
    contributionsController = require('../src/contributions/controllers/contribution-controller');

module.exports = function(app){

//    app.get('/user/:username', userController.user);

    app.get('/user/current', userController.currentUser);
    // app.get('user/:userId', userController.findUser)
    app.get('/leaderboard', userController.leaderboard);

    app.get('/contributions', contributionsController.listContributions);
    app.post('/contributions', contributionsController.addContribution);
    app.put('/contributions/:contribId', contributionsController.updateContribution);
    app.get('/contribution/:contribId', contributionsController.getContribution);

    app.get('/auth/github', passport.authenticate('github'));

	app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
		function (req, res) {
			// Successful authentication, redirect to the thank you page.
			res.redirect('/thanks.html');
		});
	app.get('/hack', function (req, res) {
		res.sendfile('./web/hack.html');
	});
};
