(function (angular) {
  'use strict';

  var TestRunCoreService = function ($httpParamSerializer, TestRunResource, Upload, baseUri) {

    this.getLatests = function (withStats) {
      return TestRunResource.query({ withStats: withStats || false }).$promise;
    };

    this.getById = function (testRunId) {
      return TestRunResource.get({ testRunId: testRunId }).$promise;
    };

    this.findByType = function (type) {
      return TestRunResource.query({ type: type, withStats: true }).$promise;
    };

    this.create = function (testRun) {
      return TestRunResource.create(testRun).$promise;
    };

    this.update = function (testRunId, type) {
      return TestRunResource.update({ id: testRunId, type: type }).$promise;
    };

    this.importCucumberResults = function (testRunId, file, importOptions) {
      var queryParams = $httpParamSerializer(importOptions);
      var url = baseUri + '/testRuns/' + testRunId + '/import?' + queryParams;

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
        TestRunCoreService.getLatests(true)
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
    .controller('TestRunCtrl', function ($q, $routeParams, $location, $uibModal, TestRunCoreService, FeatureCoreService, ScenarioCoreService, ErrorService, ConfirmationModalService, featureStoredFilters) {

      this.load = function () {

        TestRunCoreService.getById($routeParams.testRunId)
          .then(function (testRun) {

            var featuresQ = FeatureCoreService.getFeaturesByTestRunId(testRun.id);
            var statsQ = ScenarioCoreService.getStatsByTestRunId(testRun.id);
            var historyQ = TestRunCoreService.findByType(testRun.type);

            return $q.all([featuresQ, statsQ, historyQ])
              .then(_.spread(function (features, stats, history) {
                testRun.features = features;
                testRun.stats = stats;
                testRun.history = history;
                return testRun;
              }));

          })
          .then(function (testRun) {
            this.testRun = testRun;

            // TODO Not clean...
            this.history = testRun.history;
            delete testRun.history;
          }.bind(this));
      };

      this.delete = function () {

        return ConfirmationModalService
          .open({
            title: 'Supprimer le tir de tests',
            bodyContent: 'La suppression est irreversible. Êtes-vous sûr de supprimer ce tir ?',
            confirmTitle: 'Supprimer'
          })
          .then(function () {
            return TestRunCoreService.delete(this.testRun.id);
          }.bind(this))
          .then(function () {
            $location.path('/');
          });

      };


      // Import

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

            return TestRunCoreService.importCucumberResults(this.testRun.id, content.file, content.importOptions)
              .then(function () {
                this.load();
              }.bind(this))
              .catch(function (error) {
                ErrorService.sendError(error);
              });
          }.bind(this));

      };


      // Update test run

      this.openUpdateTestRunForm = function () {
        var createdModal = $uibModal.open({
          templateUrl: 'updateTestRunForm.html',
          controller: 'UpdateTestRunCtrl',
          controllerAs: 'updateCtrl',
          resolve: {
            updateRequest: {
              type: this.testRun.type
            }
          }
        });

        createdModal.result
          .then(function (updateRequest) {
            return TestRunCoreService.update(this.testRun.id, updateRequest.type)
              .then(function () {
                this.load();
              }.bind(this))
              .catch(function (error) {
                ErrorService.sendError(error);
              });
          }.bind(this));

      }.bind(this);

      // Filter

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
        type: ''
      };

      this.create = function () {
        $uibModalInstance.close(this.testRun);
      };

    })
    .controller('UpdateTestRunCtrl', function ($uibModalInstance, updateRequest) {

      this.updateRequest = updateRequest;

      this.update = function () {
        $uibModalInstance.close(this.updateRequest);
      }.bind(this);

    })
    .controller('ImportCucumberResultsCtrl', function ($uibModalInstance) {

      this.file = null;
      this.importOptions = {
        group: null,
        dryRun: false,
        onlyNewScenarii: true
      };

      this.import = function () {
        $uibModalInstance.close({
          file: this.file,
          importOptions: this.importOptions
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
          update: {
            method: 'PATCH',
            transformRequest: function (data) {
              // ID must be removed from input data
              delete data.id;
              return angular.toJson(data);
            }
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
