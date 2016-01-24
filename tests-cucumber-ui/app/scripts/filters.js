'use strict';

(function (angular) {

  angular.module('testsCucumberApp')
    .filter('niceDate', function ($filter) {

      var niceDate = function (date) {
        return $filter('date')(date, 'dd/MM/yyyy à HH:mm');
      };

      return niceDate;
    });

})(angular);
