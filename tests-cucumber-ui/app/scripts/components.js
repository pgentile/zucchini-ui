(function (angular) {
  'use strict';


  var ColumnManager = function (definition) {

    // Maximum size : Bootstrap max size
    this.maxSize = 12;

    this.definition = definition;
    this.selectedColumnNames = _.keys(definition);

    this.removeColumnByName = function (name) {
      _.remove(this.selectedColumnNames, function (value) {
        return value === name;
      });
    };

    this.count = function () {
      return this.selectedColumnNames.length;
    };

    this.isDisplayable = function (name) {
      var index = this.selectedColumnNames.findIndex(function (value) {
        return value === name;
      });
      return index !== -1;
    };

    this.getDisplaySize = function (name) {
      var size = this.definition[name];
      if (_.isNumber(size)) {
        return size;
      }
      return this.maxSize - this.getTotalDisplaySize();
    };

    this.getTotalDisplaySize = function () {
      // Select columns
      var selectedSizes = _.pick(this.definition, this.selectedColumnNames);

      // Compute current size, based on selected columns
      var currentSize = 0;
      _.forIn(selectedSizes, function (value) {
        if (_.isNumber(value)) {
          currentSize += value;
        }
      });

      return currentSize;
    };

  };


  angular.module('testsCucumberApp')
    .component('tcStatus', {
      templateUrl: 'views/tc-status.html',
      bindings: {
        status: '<'
      }
    })
    .component('tcTags', {
      templateUrl: 'views/tc-tags.html',
      bindings: {
        tags: '<',
        testRunId: '<'
      }
    })
    .component('tcScenarioProgress', {
      templateUrl: 'views/tc-scenario-progress.html',
      bindings: {
        stats: '<'
      },
      controller: function () {

        this.hasStatus = function (status) {
          return !_.isUndefined(this.stats) && _.isFinite(this.stats.statsByStatus[status]) && this.stats.statsByStatus[status] > 0;
        };

        this.getStatusPercentRate = function(status) {
          return _.isUndefined(this.stats) || this.stats.count === 0 ? 0 : 100.0 * this.stats.statsByStatus[status] / this.stats.count;
        };

        this.isValueDisplayable = function (status) {
          return this.getStatusPercentRate(status) > 10;
        };

      }
    })
    .component('tcScenarioList', {
      templateUrl: 'views/tc-scenario-list.html',
      bindings: {
        scenarii: '<',
        displayFeature: '@',
        filters: '<',
        onFilterUpdate: '&'
      },
      controller: function () {

        this.columns = new ColumnManager({
          feature: 4,
          scenario: null,
          status: 1,
          reviewed: 1
        });

        this.$onInit = function () {
          if (!this.displayFeature) {
            this.columns.removeColumnByName('feature');
          }
        };

        this.onFilterChange = function () {
          this.onFilterUpdate({ filters: this.filters });
        };

        this.isScenarioDisplayable = function (scenario) {
          switch (scenario.status) {
            case 'PASSED':
              return this.filters.passed;
            case 'FAILED':
              return this.filters.failed;
            case 'PENDING':
              return this.filters.pending;
            case 'NOT_RUN':
              return this.filters.notRun;
            default:
              return true;
          }
        }.bind(this);

      }
    });

})(angular);
