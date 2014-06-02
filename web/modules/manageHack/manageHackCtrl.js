'use strict';

module.exports = function ($scope, Contribution, $interval) {
  var AUTO_UPDATE_INTERVAL = 20000;

  $scope.refresh = function () {
    Contribution.all()
      .then(function (contribs) {
        $scope.contributions = contribs;
      });
  };


  $scope.refresh();

  var autoUpdateInterval = $interval($scope.refresh, AUTO_UPDATE_INTERVAL);
  $scope.$on('$destroy', function () {
    $interval.cancel(autoUpdateInterval);
  });
};
