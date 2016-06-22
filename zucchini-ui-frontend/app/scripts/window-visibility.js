(function (angular) {
  'use strict';

  var WindowVisibility = function ($window, $log, callbackContainer) {

    this.onVisible = callbackContainer();
    this.onHidden = callbackContainer();

    this.isVisible = function () {
      return $window.document.visibilityState === 'visible';
    };

    this.onVisible.bindToEvent($window.document, 'visibilitychange', function () {
      return this.isVisible();
    }.bind(this));

    this.onHidden.bindToEvent($window.document, 'visibilitychange', function () {
      return !this.isVisible();
    }.bind(this));

  };


  angular.module('zucchini-ui-frontend')
    .service('WindowVisibility', WindowVisibility);

})(angular);
