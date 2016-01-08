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

  };

  var TestRunCreator = function (AllTestRunsResource) {

    this.create = function (testRun) {
      return AllTestRunsResource.create(testRun).$promise;
    };

  };

  var CucumberReportImporter = function (Upload, baseUri) {

    this.import = function (testRunId, file) {
      return Upload.http({
         url: baseUri + '/test-runs/' + testRunId + '/import',
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
            createdModal.close();
            $location.path('/test-runs/' + response.id);
          })
          .catch(function () {
            createdModal.dismiss();
          });
      };

      this.load();

    })
    .controller('TestRunCtrl', function ($routeParams, TestRunLoader, FeatureLoader, CucumberReportImporter) {

      this.load = function () {

        TestRunLoader.getById($routeParams.testRunId)
          .then(function (testRun) {

            return FeatureLoader.getFeaturesByTestRunId($routeParams.testRunId)
              .then(function (features) {
                testRun.features = features;
                return testRun;
              });

          })
          .then(function (testRun) {
            this.testRun = testRun;
          }.bind(this));

      };

      this.import = function (file) {
        if (file !== null) {
          CucumberReportImporter.import(this.testRun.id, file).then(this.load.bind(this));
        }
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

      this.dismiss = function () {
        $uibModalInstance.dismiss();
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
