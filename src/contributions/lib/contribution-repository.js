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

function handlePromisedDocs(response) {
    if (!Array.isArray(response)) {
        throw new Error(response);
    }

    return response[1];
}

function makeDocsPlainObjects(docs) {
    return docs.map(function(doc) {
        return doc.toObject();
    });
}

function instantiateContribution(object) {
    return new Contribution(object);
}

function updateDoc(doc, obj) {
    var property;

    for (property in obj) {
        if (obj.hasOwnProperty(property)) {
            doc[property] = obj[property];
        }
    }

    return promiseIt(doc.save, undefined, doc);
}

function findAndUpdate(id, obj) {
    return Contribution.findById(id).then(handlePromisedDocs)
        .then(function(doc) {
            if (!doc) {
                throw new Error('contribution was not found');
            }

            return updateDoc(doc, obj);
        });
}

module.exports = {
    listAll: function() {
        return Contribution.findAll().then(handlePromisedResponse);
    },

    addContribution: function(contibObj) {
        var contrib = instantiateContribution(contibObj);

        return promiseIt(contrib.save, undefined, contrib).then(handlePromisedResponse);
    },

    updateContribution: function(contribId, contribObj) {
        return findAndUpdate(contribId, contribObj).then(handlePromisedResponse);
    }
};