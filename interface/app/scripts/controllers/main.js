'use strict';

/**
 * @ngdoc function
 * @name testsCucumberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the interfaceApp
 */
angular.module('testsCucumberApp')
  .controller('MainCtrl', function () {

  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      });
  });

