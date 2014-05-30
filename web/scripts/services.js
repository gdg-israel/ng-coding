'use strict';
angular.module('ngCoding.services', [])
  .factory("User", function ($http) {
      var usersBuffer = 0;
      return {
          isLoggedIn: function () {
            return angular.isDefined(localStorage.getItem("userId"))
          },
          current: function () {
              return $http.get("/user/current")
          },
          all: function () {
            return $http.get("user/all?next="+usersBuffer).then(function () {
              usersBuffer+=10;
            })
          },
      }
  })
