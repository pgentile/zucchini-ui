'use strict';

var zucchiniModule = require('./module');

var Chartist = require('chartist');

zucchiniModule
  .component('tcBarChart', {
    bindings: {
      data: '<',
    },
    controller: function ($element) {

      this.chart = null;

      this.$postLink = function () {
        // Attach chart to current element
        this.chart = new Chartist.Bar($element[0]);
        this.updateChart();
      };

      this.$onChanges = function () {
        // Init selected features to bound features
        if (this.chart && this.data) {
          this.updateChart();
        }
      };

      this.$onDestroy = function () {
        // Release chart resources on directive destroy
        this.chart.detach();
      };

      this.updateChart = function () {
        if (this.chart) {
          this.chart.update(
            this.data,
            {
              showLabel: false,
              stackBars: true,
              seriesBarDistance: 30,
              fullWidth: true,
              axisX: {
                showGrid: false,
              },
              axisY: {
                onlyInteger: true,
              },
            },
            true
          );
        }
      };

    },
  });
