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
    .component('tcProgress', {
      templateUrl: 'views/tc-progress.html',
      bindings: {
        total: '<',
        success: '<',
        warning: '<',
        danger: '<'
      }
    });

})(angular);
