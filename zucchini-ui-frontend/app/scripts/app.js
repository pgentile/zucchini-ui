'use strict';

require('./browser-storage.js');
require('./callback-container.js');
require('./confirmation-modal.js');
require('./errors.js');
require('./features.js');
require('./filters.js');
require('./presence.js');
require('./scenarii.js');
require('./tc-element-info.js');
require('./tc-feature-list.js');
require('./tc-glyphicon.js');
require('./tc-pie-chart.js');
require('./tc-scenario-list.js');
require('./tc-scenario-pie-chart.js');
require('./tc-simple-text.js');
require('./tc-stats-dashboard.js');
require('./tc-stats-legend.js');
require('./tc-status.js');
require('./tc-tags.js');
require('./test-run-tags.js');
require('./test-runs.js');
require('./url-builder.js');
require('./websocket.js');
require('./window-visibility.js');


var zucchiniModule = require('./module');


// Create real configuration by merging default values with configuration
var realConfig = _.merge({
  angularDebugMode: false,
  testRunPurgeDelayInDays: 31 * 3, // 3 months
}, configuration);


zucchiniModule
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

