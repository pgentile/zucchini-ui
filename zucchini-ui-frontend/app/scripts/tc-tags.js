(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcTags', {
      templateUrl: 'views/tc-tags.html',
      bindings: {
        tags: '<',
        testRunId: '<'
      }
    });

})(angular);
