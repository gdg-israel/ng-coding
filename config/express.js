'use strict';

var express = require('express'),
    passport = require('passport'),
    expressty = require('../src/expressty'),
    GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
        clientID: 'd556908ffc281010f7df',
        clientSecret: '0aa961cc85070819c6aa640ab28d95b9e2754de1',
        callbackURL: "http://ng-coding.gdg.co.il/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile);
        done();
    }
));

module.exports = function(app, config) {
//    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    //app.use(express.favicon(config.root + '/public/img/favicon.ico'));
//    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(expressty);

    // Passport config
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function(req, res) {
        res.notFound();
    });
};
