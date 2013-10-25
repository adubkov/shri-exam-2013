'use strict';

// Declare app level module which depends on filters, and services
angular.module('shriApp', ['shriApp.filters', 'shriApp.services', 'shriApp.directives', 'shriApp.controllers', 'ngSanitize']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/about', {
      templateUrl: 'partials/shriCtrl/about.html',
      controller: 'aboutCtrl'
    });

    $routeProvider.when('/students', {
      templateUrl: 'partials/studentCtrl/index.html',
      controller: 'studentIndexCtrl'
    });

    $routeProvider.when('/student/:studentId', {
      templateUrl: 'partials/studentCtrl/view.html',
      controller: 'studentViewCtrl'
    });

    $routeProvider.when('/lectures', {
      templateUrl: 'partials/lectureCtrl/index.html',
      controller: 'lectureIndexCtrl'
    });

    $routeProvider.when('/lecture/:lectureId', {
      templateUrl: 'partials/lectureCtrl/view.html',
      controller: 'lectureViewCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/about'});

    // configure html5 to get links working without #
    $locationProvider.html5Mode(true);
    
  }]);
