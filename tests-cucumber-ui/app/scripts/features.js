'use strict';

(function (angular) {

  var FeatureCoreService = function (FeatureResource) {

    this.getFeaturesByTestRunId = function (testRunId) {
      return FeatureResource.query({ testRunId: testRunId, withStats: true }).$promise;
    };

    this.getFeaturesByTestRunIdAndTag = function (testRunId, tag) {
      return FeatureResource.query({ testRunId: testRunId, tag: tag, withStats: true }).$promise;
    };

    this.getById = function (featureId) {
      return FeatureResource.get({ featureId: featureId }).$promise;
    };

    this.delete = function (featureId) {
      return FeatureResource.delete({ featureId: featureId}).$promise;
    };

    this.getFeatureHistory = function (featureId) {
      return FeatureResource.getFeatureHistory({ featureId: featureId }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .controller('FeatureCtrl', function ($routeParams, $q, $location, FeatureCoreService, TestRunCoreService, ScenarioCoreService, ConfirmationModalService, scenarioStoredFilters, historyFilters) {

      this.load = function () {

        // Load feature

        return FeatureCoreService.getById($routeParams.featureId)
          .then(function (feature) {

            var testRunQ = TestRunCoreService.getById(feature.testRunId);
            var scenariiQ = ScenarioCoreService.getScenariiByFeatureId(feature.id);
            var statsQ = ScenarioCoreService.getStatsByFeatureId(feature.id);

            return $q.all([testRunQ, scenariiQ, statsQ])
              .then(_.spread(function (testRun, scenarii, stats) {
                feature.testRun = testRun;
                feature.scenarii = scenarii;
                feature.stats = stats;
                return feature;
              }));

          })
          .then(function (feature) {
            this.feature = feature;
          }.bind(this));

      };

      this.loadHistory = function () {
        return FeatureCoreService.getFeatureHistory($routeParams.featureId)
          .then(function (history) {
            this.history = history;
          }.bind(this));
      };

      this.delete = function () {

        return ConfirmationModalService
          .open({
            title: 'Supprimer la fonctionnalité',
            bodyContent: 'La suppression est irreversible. Êtes-vous sûr de supprimer cette fonctionnnalité ?',
            confirmTitle: 'Supprimer'
          })
          .then(function () {
            return FeatureCoreService.delete(this.feature.id);
          }.bind(this))
          .then(function () {
            $location.path('/test-runs/' + this.feature.testRun.id);
          }.bind(this));

      };


      // Scenario status and history filters

      this.filters = scenarioStoredFilters.get();
      this.historyFilters = historyFilters.get();

      this.updateStoredFilters = function () {
        scenarioStoredFilters.save(this.filters);
        historyFilters.save(this.historyFilters);
      }.bind(this);

      this.isScenarioDisplayable = function (scenario) {
        switch (scenario.status) {
          case 'PASSED':
            return this.filters.passed;
          case 'FAILED':
            return this.filters.failed;
          case 'PENDING':
            return this.filters.pending;
          case 'NOT_RUN':
            return this.filters.notRun;
          default:
            return true;
        }
      }.bind(this);

      this.isHistoryItemDisplayable = function (item) {
        if (this.historyFilters.sameTestRun) {
          return item.testRun.env === this.feature.testRun.env;
        }
        return true;
      }.bind(this);


      this.load()
        .then(function () {
          this.loadHistory();
        }.bind(this));

    })
    .factory('scenarioStoredFilters', function (ObjectBrowserStorage) {
      return ObjectBrowserStorage.getItem('scenarioFilters', function () {
        return {
          passed: true,
          failed: true,
          pending: true,
          notRun: true
        };
      });
    })
    .service('FeatureCoreService', FeatureCoreService)
    .service('FeatureResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/features/:featureId',
        { featureId: '@id' },
        {
          getFeatureHistory: {
            method: 'GET',
            url: baseUri + '/features/:featureId/history',
             isArray: true,
          }
        }
      );
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/features/:featureId', {
          templateUrl: 'views/feature.html',
          controller: 'FeatureCtrl',
          controllerAs: 'ctrl'
        });
    });


})(angular);
