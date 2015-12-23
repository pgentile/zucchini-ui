'use strict';

(function (angular) {

  var ScenarioLoader = function (AllScenariiResource, $q) {

    this.getScenariiByFeatureId = function (featureId) {
      var loader = this;

      return AllScenariiResource.query({ featureId: featureId }).$promise
        .then(function (scenarii) {

          // Loading all scenarii
          return $q.all(scenarii.map(function (scenario) {
            return loader.getScenario(scenario.id);
          }));

        });
    };

    this.getScenario = function (scenarioId) {
      return AllScenariiResource.get({ scenarioId: scenarioId }).$promise;
    };

  };

  angular.module('testsCucumberApp')
    .service('ScenarioLoader', ScenarioLoader)
    .service('AllScenariiResource', function ($resource, baseUri) {
      return $resource(baseUri + '/scenarii/:scenarioId', { scenarioId: '@id' });
    });


})(angular);
