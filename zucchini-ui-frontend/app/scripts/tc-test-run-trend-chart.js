'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcTestRunTrendChart', {
    template: require('../views/tc-test-run-trend-chart.html'),
    bindings: {
      history: '<',
      testRunId: '<',
    },
    controller: function () {

      var ctrl = this;

      this.data = null;

      this.$onChanges = function () {

        if (_.isUndefined(ctrl.history) || _.isUndefined(ctrl.testRunId)) {
          ctrl.data = null;
        } else {

          // Clone, then order by date ASC
          var history = _.clone(ctrl.history).reverse();

          var testRunIndex = _.findIndex(history, function (testRun) {
            return testRun.id === ctrl.testRunId;
          });

          if (_.isUndefined(testRunIndex)) {
            history = [];
          } else {
            // Get test runs before current
            history = history.splice(0, testRunIndex + 1);
          }

          var series = [];

          ['passed', 'failed', 'pending', 'notRun'].forEach(function (type) {
            var serieValue = history.map(function (testRun) {
              return testRun.stats.all[type];
            });

            series.push({
              name: type,
              value: serieValue,
              className: 'chart-trend-' + _.kebabCase(type),
            });
          });

          ctrl.data = {
            series: series,
          };

        }
      };

    },
  });
