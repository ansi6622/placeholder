(function() {
  'use strict';

  angular.module('app')
    .controller('SignupController', function ($scope, $http, $window, $location, $rootScope) {

      $scope.createUser = function () {
        console.log($scope.user);
        $http.post('http://localhost:3000/api/v1/users/signup', $scope.user)
          .then(function (response) {
            console.log(response);
            $rootScope.user = response.data;
            $window.localStorage.setItem('token', response.data.token);
            $location.path('/')
          })

        // √ $http post /api/v1/users/signup
        // √ then
          // store token
          // redirect
        // catch
          // set $scope.errors (add to the view)

      }

    })

}());
