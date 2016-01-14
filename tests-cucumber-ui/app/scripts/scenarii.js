'use strict';

(function (angular) {

  var ScenarioCoreService = function (ScenarioResource) {

    this.getScenariiByFeatureId = function (featureId) {
      return ScenarioResource.query({ featureId: featureId }).$promise;
    };

    this.getScenario = function (scenarioId) {
      return ScenarioResource.get({ scenarioId: scenarioId }).$promise;
    };

    this.getScenarioHistory = function (scenarioId) {
      return ScenarioResource.getScenarioHistory({ scenarioId: scenarioId }).$promise;
    };

    this.delete = function (scenarioId) {
      return ScenarioResource.delete({ scenarioId: scenarioId }).$promise;
    };

    this.changeStatus = function (scenarioId, status) {
      return ScenarioResource.changeStatus({ id: scenarioId, status: status }).$promise;
    };

  };

  angular.module('testsCucumberApp')
    .controller('ScenarioCtrl', function (ScenarioResource, ScenarioCoreService, FeatureCoreService, TestRunCoreService, $routeParams, $q, $location) {

      this.scenario = {};

      this.load = function () {

        // Load scenario

        ScenarioCoreService.getScenario($routeParams.scenarioId)
          .then(function (scenario) {

            var featureQ = FeatureCoreService.getById(scenario.featureId);
            var testRunQ = TestRunCoreService.getById(scenario.testRunId);

            return $q.all([featureQ, testRunQ])
              .then(_.spread(function (feature, testRun) {
                scenario.feature = feature;
                scenario.testRun = testRun;

                return scenario;
              }));

          })
          .then(function (scenario) {
            this.scenario = scenario;
          }.bind(this));

          // Load history

          ScenarioCoreService.getScenarioHistory($routeParams.scenarioId)
            .then(function (history) {

              return $q.all(history.map(function (scenario) {
                return TestRunCoreService.getById(scenario.testRunId)
                  .then(function (testRun) {
                    scenario.testRun = testRun;
                    return scenario;
                  });
              }));

            })
            .then(function (history) {
              this.history = history;
            }.bind(this));

      };

      this.changeStatus = function (status) {
        ScenarioCoreService.changeStatus(this.scenario.id, status)
          .then(function () {
            this.load();
          }.bind(this));
      };

      this.delete = function () {
        ScenarioCoreService.delete(this.scenario.id)
          .then(function () {
            $location.path('/features/' + this.scenario.featureId);
          }.bind(this));
      };

      this.load();

    })
    .service('ScenarioCoreService', ScenarioCoreService)
    .service('ScenarioResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/scenarii/:scenarioId',
        {
          scenarioId: '@id',
          status: '@status'
        },
        {
          getScenarioHistory: {
            method: 'GET',
            url: baseUri + '/scenarii/:scenarioId/history',
            isArray: true
          },
          changeStatus: {
            method: 'POST',
            url: baseUri + '/scenarii/:scenarioId/changeStatus/:status',
          }
        }
       );
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
