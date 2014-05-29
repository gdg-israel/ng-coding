'use strict';
angular.module('ngCoding.services', [])
  .factory("User", function ($http) {
      var usersBuffer = 0;
      return {
          current: function () {
              return $http.get("/user/current").error(function onResolve(data, status, headers, config) {
              })
          },
          all: function () {
            return $http.get("user/all?next="+usersBuffer).then(function () {
              usersBuffer+=10;
            })
          },
      }
  })
