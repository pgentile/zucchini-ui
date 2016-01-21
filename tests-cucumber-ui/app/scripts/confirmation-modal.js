'use strict';

(function (angular) {

  var ConfirmationModalService = function ($uibModal) {

    this.open = function (displayOptions) {
      var modal = $uibModal.open({
        controller: function () {
          return {
            displayOptions: displayOptions
          };
        },
        controllerAs: 'ctrl',
        templateUrl: 'views/confirmation-modal.html'
      });
      return modal.result;
    };
  };

  angular.module('testsCucumberApp')
    .service('ConfirmationModalService', ConfirmationModalService);

})(angular);
