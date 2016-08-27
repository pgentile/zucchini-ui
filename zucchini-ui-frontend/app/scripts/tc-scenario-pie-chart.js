(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcScenarioPieChart', {
      template: require('../views/tc-scenario-pie-chart.html'),
      bindings: {
        stats: '<',
        kind: '@',
        showDetails: '<'
      },
      controller: function ($scope) {

        $scope.$watchGroup(['$ctrl.stats', '$ctrl.kind'], function () {
          if (_.isUndefined(this.stats) || _.isUndefined(this.kind)) {
            delete this.series;
          } else {

            var series = [
              {
                value: this.stats[this.kind].passed,
                className: 'chart-progress-passed'
              },
              {
                value: this.stats[this.kind].pending,
                className: 'chart-progress-pending'
              },
              {
                value: this.stats[this.kind].failed,
                className: 'chart-progress-failed'
              },
              {
                value: this.stats[this.kind].notRun,
                className: 'chart-progress-not-run'
              },
              {
                value: this.stats.all.count - this.stats[this.kind].count,
                className: 'chart-progress-others'
              }
            ];

            series = series.filter(function (serie) {
              return serie.value > 0;
            });

            this.series = {
              series: series
            };

          }
        }.bind(this));

      }
    });

})(angular);
