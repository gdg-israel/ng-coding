'use strict';

var mongoose = require('mongoose'),
    promiseIt = require('promise-it'),
    Contribution = mongoose.model('Contribution');//,
    // _ = require('underscore');

function makeDocsPlainObjects(docs) {
	return docs.map(function(doc) {
		return doc.toObject();
	});
}

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
        return response;
    }

    return response[1];
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

function assignUser(doc, user) {
    var userId = user.userId;
    doc.assignees.push(userId);
    return promiseIt(doc.save , undefined, doc);
}
function unassignUser(doc, user) {
    var userId = user.userId;
    Contribution.update({_id:doc.contributionId},{$pull:{assignees:userId}}, function (err) {
        if(err){
            console.log(err);
        }
    });
    return promiseIt(doc.save, undefined, doc);
}
function assignToWinner(doc, user) {
    var userId = user._id;
    console.log(userId);
    Contribution.update({_id:doc.contributionId},{$pull:{finished:userId}}, function (err) {
        if(err){
            console.log(err);
        }
    });
    doc.winners.push(userId);
    return promiseIt(doc.save, undefined, doc);

}

function assignedToFinished(doc, user) {
        var userId = user.userId;
        unassignUser(doc, user);
        doc.finished.push(userId);
        return promiseIt(doc.save, undefined, doc);
    }

function findAndUpdate(id, obj, user) {
    return Contribution.findById(id).then(handlePromisedDocs)
        .then(function(doc) {
            if (!doc) {
                throw new Error('contribution was not found');
            }
            if(obj.assignUser){
                return assignUser(doc, user);
            }
            else if(obj.unassignUser){
                return unassignUser(doc, user);
            }
            else if(obj.assignToFinished){
                return assignedToFinished(doc, user);
            }
            else if(obj.assignToWinner){
                return assignToWinner(doc, obj.user);
            }
            return updateDoc(doc, obj);
        });
}

module.exports = {
    listAll: function() {
        return Contribution.findAll().then(handlePromisedResponse);
    },
    findById: function (id) {
        return Contribution.findById(id).then(handlePromisedResponse);
    },

    addContribution: function(contibObj) {
        var contrib = instantiateContribution(contibObj);

        return promiseIt(contrib.save, undefined, contrib).then(handlePromisedResponse);
    },

    updateContribution: function(contribId, contribObj, user) {

        return findAndUpdate(contribId, contribObj, user).then(handlePromisedResponse);
    },

};
