'use strict';
var mongoose = require('mongoose'),
    contributionRepo = require('../lib/contribution-repository');

module.exports = {
    listContributions: function (req, res) {
        contributionRepo.listAll()
            .then(function(contribs) {
                res.ok(contribs);
            })

            .fail(function(err) {
                res.error(err);
            });
    },

    addContribution: function(req, res) {
        contributionRepo.addContribution(req.body)
            .then(function(createdDoc) {
                res.ok(createdDoc);
            })

            .fail(function(err) {
                res.error(err.toString());
            });
    },

    updateContribution: function(req, res) {

    }
};
