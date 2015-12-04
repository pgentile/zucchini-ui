'use strict';

/**
 * @ngdoc overview
 * @name interfaceApp
 * @description
 * # interfaceApp
 *
 * Main module of the application.
 */
angular
  .module('testsCucumberApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('baseUri', 'http://localhost:8080')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/test-runs', {
        templateUrl: 'views/test-runs.html',
        controller: 'AllTestRunsCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
