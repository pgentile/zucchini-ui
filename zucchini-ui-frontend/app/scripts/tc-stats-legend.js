'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcStatsLegend', {
    template: require('../views/tc-stats-legend.html'),
    bindings: {
      stats: '<',
    },
  });
