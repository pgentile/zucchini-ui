'use strict';

(function (angular) {

  var ScenarioLoader = function (AllScenariiResource) {

    this.getScenariiByFeatureId = function (featureId) {
      return AllScenariiResource.query({ featureId: featureId }).$promise;
    };

  };

  angular.module('testsCucumberApp')
    .service('ScenarioLoader', ScenarioLoader)
    .service('AllScenariiResource', function ($resource, baseUri) {
      return $resource(baseUri + '/scenarii/:scenarioId', { scenarioId: '@id' });
    });


})(angular);
