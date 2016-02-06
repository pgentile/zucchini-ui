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
