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

    this.create = function (testRun) {
      return TestRunResource.create(testRun).$promise;
    };

    this.importCucumberResults = function (testRunId, file, dryRun) {
      var url = baseUri + '/test-runs/' + testRunId + '/import';
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
            $location.path('/test-runs/' + response.id);
          });
      };

      this.load();

    })
    .controller('TestRunCtrl', function ($q, $routeParams, $location, $log, $uibModal, TestRunCoreService, FeatureCoreService, ErrorService, ObjectBrowserStorage) {

      this.load = function () {

        TestRunCoreService.getById($routeParams.testRunId)
          .then(function (testRun) {

            return FeatureCoreService.getFeaturesByTestRunId($routeParams.testRunId)
              .then(function (features) {

                return $q.all(features.map(function (feature) {
                  return FeatureCoreService.getStats(feature.id)
                    .then(function (stats) {
                      feature.stats = stats;
                      return feature;
                    });
                  })).then(function (features) {
                    testRun.features = features;
                    return testRun;
                  });
              });

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

      var storedFilters = ObjectBrowserStorage.getItem('featureFilters', function () {
        return {
          passed: true,
          failed: true,
          partial: true,
          notRun: true
        };
      });

      this.filters = storedFilters.get();

      this.updateStoredFilters = function () {
        storedFilters.save(this.filters);
      }.bind(this);

      this.isFeatureDisplayable = function (feature) {
        if (feature.status === 'PASSED') {
          return this.filters.passed;
        }
        if (feature.status === 'FAILED') {
          return this.filters.failed;
        }
        if (feature.status === 'PARTIAL') {
          return this.filters.partial;
        }
        if (feature.status === 'NOT_RUN') {
          return this.filters.notRun;
        }
        return true;
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
    .service('TestRunCoreService', TestRunCoreService)
    .service('TestRunResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/test-runs/:testRunId',
        { testRunId: '@id' },
        {
          create: {
            method: 'POST',
            url: baseUri + '/test-runs/create'
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
