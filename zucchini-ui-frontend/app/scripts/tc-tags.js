(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcTags', {
      template: require('../views/tc-tags.html'),
      bindings: {
        tags: '<',
        testRunId: '<'
      }
    });

})(angular);
