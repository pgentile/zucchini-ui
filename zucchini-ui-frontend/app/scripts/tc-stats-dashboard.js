(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcStatsDashboard', {
      templateUrl: 'views/tc-stats-dashboard.html',
      bindings: {
        stats: '<'
      }
    });

})(angular);
