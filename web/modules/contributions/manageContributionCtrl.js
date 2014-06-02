'use strict';
module.exports = function ($scope, $http, $stateParams, User) {
    $scope.update = function () {
        $http.get('/contribution/' + $stateParams.contribId).property('data').property('payload').assignTo($scope, 'contribution');
    };
    $scope.getUser = function (id) {
      User.get(id).then(function (user) {
        $scope.assignee = user;
      })
    };
    $scope.update();
};
