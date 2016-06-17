(function (angular) {
  'use strict';

  var StoredItem = function (storage, itemName, defaultValueFactory, log) {

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
      value = defaultValueFactory();
      storage.removeItem(itemName);
    };

  };

  var ObjectBrowserStorage = function (storage, log) {

    this.getItem = function (itemName, defaultValueFactory) {
      return new StoredItem(storage, itemName, defaultValueFactory, log);
    };

  };

  angular.module('zucchini-ui-frontend')
    .factory('ObjectBrowserStorage', function ($window, $log) {
      return new ObjectBrowserStorage($window.sessionStorage, $log);
    });

})(angular);
