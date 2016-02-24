(function (angular) {
  'use strict';

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
    .component('tcScenarioFilters', {
      templateUrl: 'views/tc-scenario-filters.html',
      bindings: {
        filters: '<',
        onUpdate: '&'
      },
      controller: function () {

        this.onFilterChange = function () {
          this.onUpdate({ filters: this.filters });
        };

      }
    });

})(angular);
