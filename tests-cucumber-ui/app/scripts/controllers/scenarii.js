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
    .controller('ScenarioCtrl', function ($routeParams, ScenarioLoader, FeatureLoader, TestRunLoader, $q) {
      this.load = function () {

        var deferredTestRun = $q.defer();

        // Load scenario

        ScenarioLoader.getScenario($routeParams.scenarioId)
          .then(function (scenario) {
            return FeatureLoader.getById(scenario.featureId)
              .then(function (feature) {
                scenario.feature = feature;
                return scenario;
              });
          })
          .then(function (scenario) {
            return TestRunLoader.getById(scenario.testRunId)
              .then(function (testRun) {
                scenario.testRun = testRun;
                return scenario;
              });
          })
          .then(function (scenario) {
            deferredTestRun.resolve(scenario.testRun);
            return scenario;
          })
          .then(function (scenario) {
            this.scenario = scenario;
          }.bind(this));

          // Load test run history

          deferredTestRun.promise
            .then(function (testRun) {
              return TestRunLoader.getByEnv(testRun.env);
            })
            .then(function (testRuns) {
              return testRuns.map(function (testRun) {
                return { testRun: testRun };
              });
            })
            .then(function (history) {
              this.history = history;
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
