'use strict';

(function (angular) {

  var TestRunCoreService = function (TestRunResource, Upload, baseUri) {

    this.getLatests = function () {
      return TestRunResource.query().$promise;
    };

    this.getById = function (testRunId) {
      return TestRunResource.get({ testRunId: testRunId }).$promise;
    };

    this.getByEnv = function (env) {
      return TestRunResource.query({ env: env }).$promise;
    };

    this.getStatsForFeatures = function (testRunId) {
      return TestRunResource.getStatsForFeatures({ testRunId: testRunId }).$promise;
    };

    this.getStatsForScenarii = function (testRunId) {
      return TestRunResource.getStatsForScenarii({ testRunId: testRunId }).$promise;
    };

    this.create = function (testRun) {
      return TestRunResource.create(testRun).$promise;
    };

    this.importCucumberResults = function (testRunId, file, dryRun) {
      var url = baseUri + '/testRuns/' + testRunId + '/import';
      if (dryRun) {
        url += '?dry-run=true';
      }

      return Upload.http({
         url: url,
         headers : {
           'Content-Type': 'application/json'
         },
         data: file
       });
    };

    this.delete = function (testRunId) {
      return TestRunResource.delete({ testRunId: testRunId }).$promise;
    };

  };

  angular.module('testsCucumberApp')
    .controller('AllTestRunsCtrl', function (TestRunCoreService, $uibModal, $location) {

      this.load = function () {
        TestRunCoreService.getLatests()
          .then(function (latestTestRuns) {
            this.latestTestRuns = latestTestRuns;
          }.bind(this));
      };

      this.openCreateForm = function () {
        var createdModal = $uibModal.open({
          templateUrl: 'createTestRunForm.html',
          controller: 'CreateTestRunCtrl',
          controllerAs: 'createCtrl'
        });

        createdModal.result
          .then(function (testRun) {
            return TestRunCoreService.create(testRun);
          })
          .then(function (response) {
            $location.path('/testRuns/' + response.id);
          });
      };

      this.load();

    })
    .controller('TestRunCtrl', function ($q, $routeParams, $location, $uibModal, TestRunCoreService, FeatureCoreService, ErrorService, featureStoredFilters) {

      this.load = function () {

        TestRunCoreService.getById($routeParams.testRunId)
          .then(function (testRun) {

            var featuresQ = FeatureCoreService.getFeaturesByTestRunId(testRun.id, true);
            var statsForFeaturesQ = TestRunCoreService.getStatsForFeatures(testRun.id);
            var statsForScenariiQ = TestRunCoreService.getStatsForScenarii(testRun.id);

            return $q.all([featuresQ, statsForFeaturesQ, statsForScenariiQ])
              .then(_.spread(function (features, statsForFeatures, statsForScenarii) {
                testRun.features = features;
                testRun.statsForFeatures = statsForFeatures;
                testRun.statsForScenarii = statsForScenarii;
                return testRun;
              }));

          })
          .then(function (testRun) {
            this.testRun = testRun;
          }.bind(this));
      };

      this.delete = function () {
        TestRunCoreService.delete(this.testRun.id)
          .then(function () {
            $location.path('/');
          });
      };

      this.openImportForm = function () {
        var createdModal = $uibModal.open({
          templateUrl: 'importCucumberResults.html',
          controller: 'ImportCucumberResultsCtrl',
          controllerAs: 'importCtrl'
        });

        createdModal.result
          .then(function (content) {
            // TODO Manage errors with Cucumber form validation
            if (content.file === null || angular.isUndefined(content.file)) {
              return $q.reject('Fichier de rapport Cucumber non défini');
            }

            return TestRunCoreService.importCucumberResults(this.testRun.id, content.file, content.dryRun);
          }.bind(this))
          .then(function () {
            this.load();
          }.bind(this))
          .catch(function (error) {
            ErrorService.sendError(error);
          });
      };


      this.filters = featureStoredFilters.get();

      this.updateStoredFilters = function () {
        featureStoredFilters.save(this.filters);
      }.bind(this);

      this.isFeatureDisplayable = function (feature) {
        switch (feature.status) {
          case 'PASSED':
            return this.filters.passed;
          case 'FAILED':
            return this.filters.failed;
          case 'PARTIAL':
            return this.filters.partial;
          case 'NOT_RUN':
            return this.filters.notRun;
          default:
            return true;
        }
      }.bind(this);


      this.load();

    })
    .controller('CreateTestRunCtrl', function ($uibModalInstance) {

      this.testRun = {
        env: ''
      };

      this.create = function () {
        $uibModalInstance.close(this.testRun);
      };

    })
    .controller('ImportCucumberResultsCtrl', function ($uibModalInstance) {

      this.file = null;

      this.dryRun = false;

      this.import = function () {
        $uibModalInstance.close({
          file: this.file,
          dryRun: this.dryRun
        });
      };

    })
    .factory('featureStoredFilters', function (ObjectBrowserStorage) {
      return ObjectBrowserStorage.getItem('featureFilters', function () {
        return {
          passed: true,
          failed: true,
          partial: true,
          notRun: true
        };
      });
    })
    .service('TestRunCoreService', TestRunCoreService)
    .service('TestRunResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/testRuns/:testRunId',
        { testRunId: '@id' },
        {
          create: {
            method: 'POST',
            url: baseUri + '/testRuns/create'
          },
          getStatsForFeatures: {
            method: 'GET',
            url: baseUri + '/testRuns/:testRunId/stats/forFeatures'
          },
          getStatsForScenarii: {
            method: 'GET',
            url: baseUri + '/testRuns/:testRunId/stats/forScenarii'
          }
        }
      );
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/test-runs.html',
          controller: 'AllTestRunsCtrl',
          controllerAs: 'ctrl'
        })
        .when('/test-runs/:testRunId', {
          templateUrl: 'views/test-run.html',
          controller: 'TestRunCtrl',
          controllerAs: 'ctrl'
        });
    });

})(angular);
