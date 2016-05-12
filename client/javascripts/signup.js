(function() {
  'use strict';

  angular.module('app')
    .controller('SignupController', function ($scope, $http, $window, $location) {

      $scope.createUser = function () {

        $http.post('http://localhost:3000/api/v1/users/signup', $scope.user)
          .then(function (response) {
            console.log("sdfksdf", response.data);
            $window.localStorage.setItem('token', response.data.token);
            $location.path('/')
          })
      }

    })

}());
