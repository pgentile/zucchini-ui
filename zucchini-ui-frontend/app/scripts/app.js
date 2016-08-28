require('angular');
require("angular-elastic");
require("angular-loading-bar");
require("angular-resource");
require("angular-route");
require("angular-ui-bootstrap");
require("ng-file-upload");


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


require("./browser-storage.js");
require("./callback-container.js");
require("./confirmation-modal.js");
require("./errors.js");
require("./features.js");
require("./filters.js");
require("./presence.js");
require("./scenarii.js");
require("./tc-element-info.js");
require("./tc-feature-list.js");
require("./tc-pie-chart.js");
require("./tc-scenario-list.js");
require("./tc-scenario-pie-chart.js");
require("./tc-simple-text.js");
require("./tc-stats-dashboard.js");
require("./tc-stats-legend.js");
require("./tc-status.js");
require("./tc-tags.js");
require("./test-run-tags.js");
require("./test-runs.js");
require("./url-builder.js");
require("./websocket.js");
require("./window-visibility.js");
