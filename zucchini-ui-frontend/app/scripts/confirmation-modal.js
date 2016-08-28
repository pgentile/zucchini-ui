'use strict';

var zucchiniModule = require('./module');


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

zucchiniModule
  .service('ConfirmationModalService', ConfirmationModalService);
