'use strict';

var zucchiniModule = require('./module');

var Chartist = require('chartist');

zucchiniModule
  .component('tcPieChart', {
    template: require('../views/tc-feature-list.html'),
    bindings: {
      data: '<',
      total: '<',
      showLabel: '<',
      donutWidth: '<',
    },
    controller: function ($element) {

      this.chart = null;

      this.$postLink = function () {
        // Attach chart to current element
        this.chart = new Chartist.Pie($element[0]);
        this.updateChart();
      };

      this.$onChanges = function () {
        // Init selected features to bound features
        if (this.chart && this.data && _.isNumber(this.total)) {
          this.updateChart();
        }
      };

      this.$onDestroy = function () {
        // Release chart resources on directive destroy
        this.chart.detach();
      };

      this.updateChart = function () {
        if (this.chart) {
          this.chart.update(this.data, {
            total: this.total,
            donut: true,
            showLabel: this.showLabel,
            donutWidth: this.donutWidth,
          }, true);
        }
      };

    },
  });
