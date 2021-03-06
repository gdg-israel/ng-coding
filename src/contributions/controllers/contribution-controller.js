'use strict';
var contributionRepo = require('../lib/contribution-repository');

module.exports = {
    listContributions: function (req, res) {
        contributionRepo.listAll()
            .then(function(contribs) {
                res.ok(contribs);
            })

            .fail(function(err) {
                res.error(err.toString());
            });
    },
    getContribution: function (req, res) {
        contributionRepo.findById(req.params.contribId)
            .then(function(contrib) {
                res.ok(contrib);
            })

            .fail(function(err) {
                res.error(err.toString());
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
        contributionRepo.updateContribution(req.params.contribId, req.body, req.user)
            .then(function(updatedContrib) {
                res.ok(updatedContrib);
            })

            .fail(function(err) {
                res.error(err.toString());
            });
    }
};
