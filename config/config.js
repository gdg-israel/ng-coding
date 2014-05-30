'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'ng-coding'
        },
        port: 3000,
        db: 'mongodb://localhost/ng-coding',
        github: {
            clientId: "d556908ffc281010f7df",
            clientSecret: "0aa961cc85070819c6aa640ab28d95b9e2754de1",
            callbackUrl: 'http://ng-coding.gdg.co.il/auth/github/callback'
        }
    },

    test: {
        root: rootPath,
        app: {
            name: 'ng-coding'
        },
        port: 3000,
        db: 'mongodb://localhost/ng-coding'
    },

    production: {
        root: rootPath,
        app: {
            name: 'ng-coding'
        },
        port: 3000,
        db: 'mongodb://localhost/ng-coding'
    }
};

module.exports = config[env];
