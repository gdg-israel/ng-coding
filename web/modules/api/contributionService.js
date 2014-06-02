'use strict';
module.exports = function ($http) {
    return {
        assignUser: function (contribution) {
            return $http.put('/contributions/' + contribution.contributionId,{assignUser:true});
        },
        unassignUser: function (contribution) {
          return $http.put('/contributions/' + contribution.contributionId,{unassignUser:true});
        },
        assignedtoFinished: function (contribution) {
          return $http.put('/contributions/' + contribution.contributionId, {assignToFinished: true});
        },
    };
};
