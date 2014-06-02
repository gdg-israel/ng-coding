'use strict';
module.exports = function ($http) {
    return {
        all: function () {
            return $http.get('/contributions').property('data').property('payload');
        },
        assignUser: function (contribution) {
            return $http.put('/contributions/' + contribution.contributionId,{assignUser:true});
        },
        unassignUser: function (contribution) {
            return $http.put('/contributions/' + contribution.contributionId,{unassignUser:true});
        },
        assignedtoFinished: function (contribution) {
            return $http.put('/contributions/' + contribution.contributionId, {assignToFinished: true});
        },
        assignToWinner: function (user, contribution) {
            return $http.put('/contributions/' + contribution.contributionId, {assignToWinner: true, user: user});
        },
        updateScore: function (contribution, newScore) {
            return $http.put('/contributions/' + contribution.contributionId, {score: newScore});
        },
    };
};
