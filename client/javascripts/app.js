(function() {
  'use strict';
  angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
      $httpProvider.interceptors.push("authInterceptor");

      $routeProvider
       .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'HomeController',
        resolve: {
          currentUser: function ($http) {
            return $http.get('http://localhost:3000/api/v1/users/me')
              .then(function (response) {
                console.log(response);
                if(response.data.error){
                  return null;
                } else {
                  return response.data
                }
              })
              .catch(function () {
                localStorage.clear();
                return null;
              })
          }
        }
      })
      .when('/signup', {
        templateUrl: '/templates/signup.html',
        controller: 'SignupController'
      })
      .when('/beers', {
        templateUrl: '/templates/beers.html',
        controller: 'BeersController',
        requiresLogin: true, // I can put arbitrary data on a route
        resolve: {
          currentUser: function ($http, $location) {
            return $http.get('http://localhost:3000/api/v1/users/me')
              .then(function (response) {
                return response.data
              })
              .catch(function () {
                localStorage.clear();
                $location.path("/")
                return null;
              })
          }
        }
      });
      $locationProvider.html5Mode(true);
    });

    angular.module('app').run(function ($rootScope, $location, $window) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if (next.$$route.requiresLogin && !localStorage.getItem('token')) {
          $location.path('/');
        }

      });
    });

    angular.module('app').factory('authInterceptor', function () {
      return {
        request: function(config) {
          if (localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
          }

          return config;
        },

        responseError: function(response) {
          console.log(response);
          return response;
        }
      };
    })

}());

// (function() {
//   'use strict';
//
//   angular.module('app', ['ngRoute'])
//     .config(function($routeProvider, $locationProvider, $httpProvider) {
//       $httpProvider.interceptors.push("authInterceptor")
//
//       $routeProvider
//        .when('/', {
//         templateUrl: '/templates/home.html',
//         controller: 'HomeController',
//         resolve: {
//           currentUser: function ($http) {
//               return $http.get('http://localhost:3000/api/v1/users/me')
//                 .then(function (response) {
//                   if(response.data.error){
//                     return null;
//                   } else{
//                     return response.data
//                   }
//               })
//             }
//           }
//         })
//       .when('/signup', {
//         templateUrl: '/templates/signup.html',
//         controller: 'SignupController'
//       })
//       .when('/beers', {
//         templateUrl: '/templates/beers.html',
//         controller: 'BeersController',
//         requiresLogin: true, // I can put arbitrary data on a route
//         resolve: {
//           currentUser: function ($http, $location) {
//               return $http.get('http://localhost:3000/api/v1/users/me')
//                 .then(function (response) {
//                   if(!response.data.error) {
//                     console.log("nice things", response.data);
//                     return response.data
//                   } else {
//                     console.log("bad things", response.data);
//                     localStorage.clear();
//                     $location.path('/signup');
//                     return null;
//                   }
//                 })
//                 .catch(function () {
//                   localStorage.clear();
//                   $location.path('/signup');
//                   return null;
//                 })
//
//             }
//           }
//       })
//
//       $locationProvider.html5Mode(true);
//
//
//     });
//
//     // app.run runs once when the app starts
//     // this improves user experience
//     angular.module('app').run(function ($rootScope, $location, $window) {
//       $rootScope.$on('$routeChangeStart', function (event, next, current) {
//         // if the next route requires login
//         // and we don't have a token
//         // then redirect to the homepage
//
//         if (next.$$route.requiresLogin && !localStorage.getItem('token')) {
//           $location.path('/signup');
//         }
//
//       });
//     });
//
//
//     angular.module('app').factory('authInterceptor', function($location){
//       return {
//         request: function(config){
//           if (localStorage.getItem('token')) {
//             config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
//           }
//           return config;
//         },
//         responseError: function(response) {
//           console.log("i wasnt allowed", response);
//           //optionally check if token is there
//           //do nice ux stuff, read the error for them
//           //or slice there knees off up to you
//           if(response.status === 403){
//             localStorage.removeItem('token');
//             $location.path('/signup');
//           }
//           return response;
//         }
//       }
//     })
// }());
