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
        onFilterUpdate: '&',
        extraFilter: '<'
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
          return this.isScenarioStatusDisplayable(scenario) && this.isScenarioReviewedStateDisplayable(scenario) && this.isScenarioAcceptedByExtraFilter(scenario);
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
          if (!this.filters.reviewed) {
            return !scenario.reviewed;
          }
          return true;
        };

        this.isScenarioAcceptedByExtraFilter = function (scenario) {
          if (!_.isUndefined(this.extraFilter)) {
            return this.extraFilter(scenario);
          }
          return true;
        };

      }
    })
    .component('tcFeatureList', {
      templateUrl: 'views/tc-feature-list.html',
      bindings: {
        features: '<',
        filters: '<',
        onFilterUpdate: '&',
        onFeaturesFiltered: '&'
      },
      controller: function ($scope) {

        this.$onInit = function () {
          // Watch changes on filtered feature list
          $scope.$watch('filteredFeatures', function (filteredFeatures) {
            if (_.isArray(filteredFeatures)) {
              var featureIds = filteredFeatures.map(function (feature) {
                return feature.id;
              });
              this.onFeaturesFiltered({ featureIds: featureIds });
            }
          }.bind(this));
        };

        this.onFilterChange = function () {
          this.onFilterUpdate({ filters: this.filters });
        };

        this.isFeatureDisplayable = function (feature) {
          return this.isFeatureStatusDisplayable(feature) && this.isFeatureReviewedStateDisplayable(feature);
        }.bind(this);

        this.isFeatureStatusDisplayable = function (feature) {
          switch (feature.status) {
            case 'PASSED':
              return this.filters.passed;
            case 'FAILED':
              return this.filters.failed;
            case 'PARTIAL':
              return this.filters.partial;
            case 'NOT_RUN':
              return this.filters.notRun;
            default:
              return true;
          }
        };

        this.isFeatureReviewedStateDisplayable = function (feature) {
          if (!this.filters.reviewed) {
            return feature.stats.reviewedCount !== feature.stats.count;
          }
          return true;
        };

      }
    });

})(angular);
