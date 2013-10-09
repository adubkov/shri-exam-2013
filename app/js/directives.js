'use strict';

/* Directives */


angular.module('shriApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('yPlayer', ['', function() {
    return {
    	
    };
  }])

  ;
