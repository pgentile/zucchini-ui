(function (angular) {
  'use strict';

  var StoredItem = function (storage, itemName, defaultValueFactory, log) {

    var value = defaultValueFactory();

    var storedValue = storage.getItem(itemName);
    if (_.isString(storedValue)) {
      try {
        _.merge(value, angular.fromJson(storedValue));
      } catch (e) {
        log.warn('Caught exception when loading filters from local storage item', itemName, ':', e);
      }
    }

    this.get = function () {
      return value;
    };

    this.save = function (newValue) {
      value = newValue;
      storage.setItem(itemName, angular.toJson(value));
    };

    this.reset = function () {
      value = defaultValueFactory();
      storage.removeItem(itemName);
    };

  };

  var BrowserObjectStorage = function (storage, log) {

    this.getItem = function (itemName, defaultValueFactory) {
      return new StoredItem(storage, itemName, defaultValueFactory, log);
    };

  };

  angular.module('zucchini-ui-frontend')
    .factory('BrowserSessionStorage', function ($window, $log) {
      return new BrowserObjectStorage($window.sessionStorage, $log);
    })
    .factory('BrowserLocalStorage', function ($window, $log) {
      return new BrowserObjectStorage($window.localStorage, $log);
    });

})(angular);
