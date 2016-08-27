(function (angular) {
  'use strict';

  var ConfirmationModalService = function ($uibModal) {

    this.open = function (displayOptions) {
      var modal = $uibModal.open({
        controller: function () {
          return {
            displayOptions: displayOptions
          };
        },
        controllerAs: 'ctrl',
        template: require('../views/confirmation-modal.html')
      });
      return modal.result;
    };
  };

  angular.module('zucchini-ui-frontend')
    .service('ConfirmationModalService', ConfirmationModalService);

})(angular);
