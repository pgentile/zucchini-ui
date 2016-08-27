(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcStatsLegend', {
      template: require('../views/tc-stats-legend.html'),
      bindings: {
        stats: '<'
      }
    });

})(angular);
