(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .component('tcStatus', {
      templateUrl: 'views/tc-status.html',
      bindings: {
        status: '<'
      }
    });

})(angular);
