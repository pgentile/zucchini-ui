'use strict';

(function (angular, appConfig) {

  angular
    .module('testsCucumberApp', [
      'ngResource',
      'ngRoute',
      'ui.bootstrap',
      'ngFileUpload',
      'angular-loading-bar'
    ])
    .constant('baseUri', _.trimEnd(appConfig.apiBaseUri, '/'))
    .config(function ($compileProvider) {
      $compileProvider.debugInfoEnabled(appConfig.angularDebugMode || false);
    })
    .config(function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular, configuration);
