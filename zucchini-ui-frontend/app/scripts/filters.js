(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .filter('niceDate', function ($filter) {

      var niceDate = function (date) {
        return $filter('date')(date, 'dd/MM/yyyy à HH:mm');
      };

      return niceDate;
    });

})(angular);
