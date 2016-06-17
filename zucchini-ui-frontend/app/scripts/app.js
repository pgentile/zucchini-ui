(function (angular, customConfig) {
  'use strict';


  // Create real configuration by merging default values with configuration
  var realConfig = _.merge({
    angularDebugMode: false
  }, customConfig);


  angular
    .module('zucchini-ui-frontend', [
      'ngResource',
      'ngRoute',
      'ui.bootstrap',
      'ngFileUpload',
      'angular-loading-bar',
      'monospaced.elastic'
    ])
    .constant('config', realConfig)
    .config(function ($compileProvider, config) {
      // Enable Angular debug mode if requested
      $compileProvider.debugInfoEnabled(config.angularDebugMode);
    })
    .config(function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });
    });

})(angular, configuration);
