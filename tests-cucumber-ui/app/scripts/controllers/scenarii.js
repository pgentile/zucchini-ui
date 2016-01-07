'use strict';

(function (angular) {

  var ScenarioLoader = function (AllScenariiResource) {

    this.getScenariiByFeatureId = function (featureId) {
      return AllScenariiResource.query({ featureId: featureId }).$promise;
    };

    this.getScenario = function (scenarioId) {
      return AllScenariiResource.get({ scenarioId: scenarioId }).$promise;
    };

  };

  angular.module('testsCucumberApp')
    .controller('ScenarioCtrl', function ($routeParams, ScenarioLoader, FeatureLoader) {
      this.load = function () {
        ScenarioLoader.getScenario($routeParams.scenarioId)
          .then(function (scenario) {
            return FeatureLoader.getById(scenario.featureId)
              .then(function (feature) {
                scenario.feature = feature;
                return scenario;
              });
          })
          .then(function (scenario) {
            this.scenario = scenario;
          }.bind(this));
      };

      this.load();

    })
    .service('ScenarioLoader', ScenarioLoader)
    .service('AllScenariiResource', function ($resource, baseUri) {
      return $resource(baseUri + '/scenarii/:scenarioId', { scenarioId: '@id' });
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/scenarii/:scenarioId', {
          templateUrl: 'views/scenario.html',
          controller: 'ScenarioCtrl',
          controllerAs: 'ctrl'
        });
    });


})(angular);
