'use strict';

var mongoose = require('mongoose'),
    promiseIt = require('promise-it'),
    Contribution = mongoose.model('Contribution');

function handlePromisedResponse(response) {
    var err = response[0],
        docs = response[1];

    if (err) {
        throw new Error(err);
    }

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