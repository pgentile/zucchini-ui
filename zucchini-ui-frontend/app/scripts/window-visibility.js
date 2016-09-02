'use strict';

var zucchiniModule = require('./module');


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


zucchiniModule
  .service('WindowVisibility', WindowVisibility);
