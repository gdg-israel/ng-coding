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
        db: 'mongodb://localhost/ng-coding'
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
