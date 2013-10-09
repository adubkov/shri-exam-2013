'use strict';


// Declare app level module which depends on filters, and services
angular.module('shriApp', ['shriApp.filters', 'shriApp.services', 'shriApp.directives', 'shriApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/about', {templateUrl: 'partials/shriCtrl/about.html', controller: 'aboutCtrl'});

  	$routeProvider.when('/students', {templateUrl: 'partials/studentCtrl/index.html', controller: 'studentIndexCtrl'});
  	$routeProvider.when('/student/:studentId', {templateUrl: 'partials/studentCtrl/view.html', controller: 'studentViewCtrl'});
  	$routeProvider.when('/student/:studentId/add', {templateUrl: 'partials/studentCtrl/add.html', controller: 'studentAddCtrl'});
  	$routeProvider.when('/student/:studentId/update', {templateUrl: 'partials/studentCtrl/update.html', controller: 'studentUpdateCtrl'});
  	$routeProvider.when('/student/:studentId/delete', {templateUrl: 'partials/studentCtrl/delete.html', controller: 'studentDeleteCtrl'});

	$routeProvider.when('/lectures', {templateUrl: 'partials/lectureCtrl/index.html', controller: 'lectureIndexCtrl'});
	$routeProvider.when('/lecture/:lectureId', {templateUrl: 'partials/lectureCtrl/view.html', controller: 'lectureViewCtrl'});
	$routeProvider.when('/lecture/:lectureId/add', {templateUrl: 'partials/lectureCtrl/add.html', controller: 'lectureAddCtrl'});
	$routeProvider.when('/lecture/:lectureId/update', {templateUrl: 'partials/lectureCtrl/update.html', controller: 'lectureUpdateCtrl'});
	$routeProvider.when('/lecture/:lectureId/delete', {templateUrl: 'partials/lectureCtrl/delete.html', controller: 'lectureDeleteCtrl'});

    $routeProvider.otherwise({redirectTo: '/about'});
  }]);
