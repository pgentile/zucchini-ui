'use strict';

(function (angular) {

  var ErrorService = function () {

      /**
       * Ajouter une erreur.
       */
      this.sendError = function (error) {
        this.listeners.forEach(function (listener) {
          listener(error);
        });
      };

      this.addListener = function (listener) {
        this.listeners.push(listener);
      };

      this.listeners = [];

  };

  angular.module('testsCucumberApp')
    .controller('ErrorCtrl', function (ErrorService) {

      this.addError = function (message) {
        this.message = message;
      };

      this.dismiss = function () {
        this.message = null;
      };

      ErrorService.addListener(function (error) {
        this.addError(error);
      }.bind(this));

    })
    .service('ErrorService', ErrorService)
    .factory('errorHttpInterceptor', function ($q, ErrorService) {
        return {
            responseError: function responseError(rejection) {
                ErrorService.sendError(rejection);
                return $q.reject(rejection);
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('errorHttpInterceptor');
    });

})(angular);
