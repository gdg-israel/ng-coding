'use strict';

var mongoose = require('mongoose'),
    promiseIt = require('promise-it'),
    Contribution = mongoose.model('Contribution');

function handlePromisedResponse(response) {
    if (!Array.isArray(response)) {
        throw new Error(response);
    }

    var docs = response[1];

   if (Array.isArray(docs)) {
        return makeDocsPlainObjects(docs);
    }

    return docs.toObject();
}

function makeDocsPlainObjects(docs) {
    return docs.map(function(doc) {
        return doc.toObject();
    });
}

function instantiateContribution(object) {
    return new Contribution(object);
}


module.exports = {
    listAll: function() {
        return Contribution.findAll().then(handlePromisedResponse);
    },

    addContribution: function(contibObj) {
        var contrib = instantiateContribution(contibObj);

        return promiseIt(contrib.save, undefined, contrib).then(handlePromisedResponse);
    },

    updateContribution: function() {

    }
};