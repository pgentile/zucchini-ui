'use strict';

(function (angular, appConfig) {

  angular
    .module('testsCucumberApp', [
      'ngResource',
      'ngRoute',
      'ui.bootstrap',
      'ngFileUpload'
    ])
    .constant('baseUri', _.trimEnd(appConfig.apiBaseUri, '/'))
    .config(function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular, configuration);
