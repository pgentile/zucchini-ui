(function (angular) {
  'use strict';

  var StoredItem = function (log, storage, itemName, defaultValueFactory) {

    var value = defaultValueFactory();

    var storedValue = storage.getItem(itemName);
    if (_.isString(storedValue)) {
      try {
        _.merge(value, JSON.parse(storedValue));
      } catch (e) {
        log.warn('Caught exception when loading filters from local storage item', itemName, ':', e);
      }
    }

    this.get = function () {
      return value;
    };

    this.save = function (newValue) {
      value = newValue;
      storage.setItem(itemName, JSON.stringify(value));
    };

    this.reset = function () {
      value = null;
      storage.removeItem(itemName);
    };

  };

  var ObjectBrowserStorage = function (log, storage) {

    this.getItem = function (itemName, defaultValueFactory) {
      return new StoredItem(log, storage, itemName, defaultValueFactory);
    };

  };

  angular
    .module('testsCucumberApp')
    .factory('sessionStorage', function ($window) {
      return $window.sessionStorage;
    })
    .factory('ObjectBrowserStorage', function ($log, sessionStorage) {
      return new ObjectBrowserStorage($log, sessionStorage);
    });

})(angular);
