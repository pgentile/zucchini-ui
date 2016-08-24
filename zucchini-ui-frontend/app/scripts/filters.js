(function (angular) {
  'use strict';

  angular.module('zucchini-ui-frontend')
    .filter('niceDate', function ($filter) {

      var niceDate = function (date) {
        return $filter('date')(date, 'dd/MM/yyyy à HH:mm');
      };

      return niceDate;
    })
    .filter('numberAsPercent', function ($filter) {

      var numberAsPercent = function (n) {
        // Number formatting returned a result, this is a valid number
        var formatted = $filter('number')(n, 1);
        if (formatted) {
          return formatted + ' %';
        }
        return 'N/A';
      };

      return numberAsPercent;
    });

})(angular);
