'use strict';

(function (angular) {

  var TestRunLoader = function (AllTestRunsResource) {

    this.getLatests = function () {
      return AllTestRunsResource.query().$promise;
    };

    this.getById = function (testRunId) {
      return AllTestRunsResource.get({ testRunId: testRunId }).$promise;
    };

    this.getByEnv = function (env) {
      return AllTestRunsResource.query({ env: env }).$promise;
    };

    // FIXME This is not a good class !!!
    this.delete = function (testRunId) {
      return AllTestRunsResource.delete({ testRunId: testRunId }).$promise;
    };

  };

  var TestRunCreator = function (AllTestRunsResource) {

    this.create = function (testRun) {
      return AllTestRunsResource.create(testRun).$promise;
    };

  };

  var CucumberReportImporter = function (Upload, baseUri) {

    this.import = function (testRunId, file, dryRun) {
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

  };

  angular.module('testsCucumberApp')
    .controller('AllTestRunsCtrl', function (TestRunLoader, TestRunCreator, $uibModal, $location) {

      this.load = function () {
        TestRunLoader.getLatests()
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
            return TestRunCreator.create(testRun);
          })
          .then(function (response) {
            $location.path('/test-runs/' + response.id);
          });
      };

      this.load();

    })
    .controller('TestRunCtrl', function ($q, $routeParams, $location, $uibModal, TestRunLoader, FeatureLoader, CucumberReportImporter) {

      this.load = function () {

        TestRunLoader.getById($routeParams.testRunId)
          .then(function (testRun) {

            return FeatureLoader.getFeaturesByTestRunId($routeParams.testRunId)
              .then(function (features) {

                return $q.all(features.map(function (feature) {
                  return FeatureLoader.getStats(feature.id)
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
        TestRunLoader.delete(this.testRun.id).then(function () {
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
            if (content.file === null || angular.isUndefined(content.file)) {
              throw new Error('No file defined');
            }

            return CucumberReportImporter.import(this.testRun.id, content.file, content.dryRun);
          }.bind(this))
          .then(function () {
            this.load();
          }.bind(this));
      };

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
    .service('TestRunLoader', TestRunLoader)
    .service('TestRunCreator', TestRunCreator)
    .service('CucumberReportImporter', CucumberReportImporter)
    .service('AllTestRunsResource', function ($resource, baseUri) {
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
