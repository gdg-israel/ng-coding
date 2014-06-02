'use strict';
module.exports = function ($scope, $http, $stateParams, $interval, User, Contribution) {
  var AUTO_UPDATE_INTERVAL = 10000;
  var users = {};
    $scope.update = function () {
        $http.get('/contribution/' + $stateParams.contribId).property('data').property('payload').assignTo($scope, 'contribution');
    };
    $scope.$watch('contribution',function (contrib) {
        if(!angular.isUndefined(contrib)){
          angular.forEach(contrib.finished, function (assignee) {
            var userId = assignee.userId || assignee;
            User.get(userId).then(function (user) {
              users[user.userId] = user;
            });
          });
        }

    });
    $scope.updateScore = function () {
      var contribution = $scope.contribution;
      Contribution.updateScore(contribution, $scope.newScore).then(function () {
          $scope.update();
      });
    };
    $scope.makeWinner = function () {
      var contrib = $scope.contribution;
      Contribution.assignToWinner(contrib);
      $scope.update();
    };
    $scope.users = users;
    $scope.update();
    var autoUpdateInterval = $interval($scope.update, AUTO_UPDATE_INTERVAL);
    $scope.$on('$destroy', function () {
      $interval.cancel(autoUpdateInterval);
    });
};
