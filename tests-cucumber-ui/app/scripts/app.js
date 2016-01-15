'use strict';

(function (angular, appConfig) {

  angular
    .module('testsCucumberApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'ngFileUpload'
    ])
    .constant('baseUri', appConfig.apiBaseUri)
    .factory('sessionStorage', function ($window) {
      return $window.sessionStorage;
    })
    .config(function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular, configuration);
