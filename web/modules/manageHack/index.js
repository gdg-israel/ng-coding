var moduleName = 'ngCoding.manageHack';

angular.module(moduleName, [
    require('../api')
  ])
  .constant('ManageHackView', require('./manageHackView.html'))
  .controller('ManageHackCtrl', require('./manageHackCtrl'));

module.exports = moduleName;
