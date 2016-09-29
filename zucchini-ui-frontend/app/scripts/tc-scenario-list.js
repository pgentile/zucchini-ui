'use strict';

var zucchiniModule = require('./module');


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


zucchiniModule
  .component('tcScenarioList', {
    template: require('../views/tc-scenario-list.html'),
    bindings: {
      scenarii: '<',
      displayFeature: '@',
    },
    controller: function (scenarioStoredFilters) {

      this.columns = new ColumnManager({
        feature: 4,
        scenario: null,
        status: 1,
        reviewed: 1,
      });

      this.selectedScenarii = [];

      this.$onInit = function () {
        // Configure columns
        if (!this.displayFeature) {
          this.columns.removeColumnByName('feature');
        }

        // Get filters
        this.filters = scenarioStoredFilters.get();
      };

      this.$onChanges = function () {
        // Init selected scenarii to bound scenarii
        if (this.scenarii) {
          this.updateScenariiSelection();
        }
      };

      this.updateScenariiSelection = function () {
        this.selectedScenarii = _.filter(this.scenarii, this.isScenarioDisplayable);
      };

      this.onFilterChange = function () {
        scenarioStoredFilters.save(this.filters);
        this.updateScenariiSelection();
      };

      this.isScenarioDisplayable = function (scenario) {
        return this.isScenarioStatusDisplayable(scenario) && this.isScenarioReviewedStateDisplayable(scenario);
      }.bind(this);

      this.isScenarioStatusDisplayable = function (scenario) {
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
      };

      this.isScenarioReviewedStateDisplayable = function (scenario) {
        var selected = false;
        if (this.filters.reviewed) {
          selected = selected || scenario.reviewed;
        }
        if (this.filters.notReviewed) {
          selected = selected || !scenario.reviewed;
        }
        return selected;
      };

    },
  })
  .factory('scenarioStoredFilters', function (BrowserSessionStorage) {
    return BrowserSessionStorage.getItem('scenarioFilters', function () {
      return {
        passed: true,
        failed: true,
        pending: true,
        notRun: true,
        reviewed: true,
        notReviewed: true,
      };
    });
  });
