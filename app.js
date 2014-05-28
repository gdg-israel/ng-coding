'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config'),
    cluster = require('cluster'),
    app = express(),
    numCPUs = require('os').cpus().length;

/**
 * Bootstrapping service
 */
(function() {

    /**
     * Fork processes on production environment
     */
    var i;

    if (cluster.isMaster && app.get('env') !== 'development') {
        for (i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', function(worker) {
            console.log('worker ' + worker.process.pid + ' died');
            cluster.fork();
        });

        return;
    }

    mongoose.connect(config.db);

    var db = mongoose.connection,
        modulesPath = __dirname + '/src';

    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    fs.readdirSync(modulesPath).forEach(function(dir) {
        if (dir.indexOf('.') !== -1) {
            return;
        }

        require(modulesPath + '/' + dir);
    });

    require('./config/express')(app, config);
    require('./config/routes')(app);

    app.listen(config.port, function() {
        console.log('server is listening to port ' + config.port);
    });
}());
