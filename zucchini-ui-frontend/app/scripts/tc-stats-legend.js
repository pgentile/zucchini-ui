(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcStatsLegend', {
      templateUrl: 'views/tc-stats-legend.html',
      bindings: {
        stats: '<'
      }
    });

})(angular);
