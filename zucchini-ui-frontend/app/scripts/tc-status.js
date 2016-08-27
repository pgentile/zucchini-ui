(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcStatus', {
      template: require('../views/tc-status.html'),
      bindings: {
        status: '<'
      }
    });

})(angular);
