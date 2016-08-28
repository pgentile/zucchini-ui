'use strict';

var zucchiniModule = require('./module');


var CallbackContainer = function () {

  this.onActivate = _.noop;
  this.onDeactivate = _.noop;

  this._callbacks = [];

  this.add = function (callback) {
    var active = this._isActive();

    this._callbacks.push(callback);

    if (!active) {
      this.onActivate(this);
    }
  };

  this.remove = function (callback) {
    var active = this._isActive();

    _.remove(this._callbacks, function (someCallback) {
      return someCallback === callback;
    });

    if (active) {
      this.onDeactivate(this);
    }
  };

  this.removeAll = function () {
    var active = this._isActive();

    this._callbacks = [];

    if (active) {
      this.onDeactivate(this);
    }
  };

  this.invoke = function () {
    var invokeArgs = arguments;
    this._callbacks.forEach(function (callback) {
      callback.apply(undefined, invokeArgs);
    });
  };

  this.bindToEvent = function (target, eventName, eventFilter) {
    var self = this;

    var listener = function (event) {
      if (_.isUndefined(eventFilter) || eventFilter(event)) {
        self.invoke();
      }
    };

    this.onActivate = function () {
       target.addEventListener(eventName, listener);
    };
    this.onDeactivate = function () {
       target.removeEventListener(eventName, listener);
    };
  };

  this._isActive = function () {
    return this._callbacks.length > 0;
  };

};


/**
 * Create more usesable callback container interface.
 */
var createSimpleCallbackContainer = function () {
  var container = new CallbackContainer();

  var adder = function (callback) {
    // Add a callback
    container.add(callback);

    // Return a object with a remove() function, to remove the callback
    return {
      remove: function () {
        container.remove(callback);
      }
    };
  };

  // Created function owns extra functions to invoke callbacks and bind document event
  adder.invoke = _.bind(container.invoke, container);
  adder.bindToEvent = _.bind(container.bindToEvent, container);

  return adder;
};


zucchiniModule
  .factory('callbackContainer', function () {
    return createSimpleCallbackContainer;
  });
