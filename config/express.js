'use strict';

var express = require('express'),
    passport = require('passport'),
    expressty = require('../src/expressty'),
    config = require('../config/config'),
    authCallback = require('../src/user/lib/auth'),
    GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackUrl
    },
    authCallback
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
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'ng-conf-ng-coding' }));

    // Passport config
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function(req, res) {
        res.notFound();
    });
};
