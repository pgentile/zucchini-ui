'use strict';

(function (angular) {

  var TestRunLoader = function (AllTestRunsResource) {

    this.getLatests = function () {
      return AllTestRunsResource.query().$promise;
    };

    this.getById = function (testRunId) {
      return AllTestRunsResource.get({ testRunId: testRunId }).$promise;
    };

  };

  var TestRunCreator = function (AllTestRunsResource) {

    this.create = function (testRun) {
      return AllTestRunsResource.create(testRun).$promise;
    };

  };

  angular.module('testsCucumberApp')
    .controller('AllTestRunsCtrl', function ($log, TestRunLoader, $uibModal, $location) {

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

        createdModal.result.then(function (result) {
          $location.path('/test-runs/' + result.id);
        });
      };

      this.load();

    })
    .controller('TestRunCtrl', function ($routeParams, TestRunLoader, FeatureLoader, $window, Upload, baseUri) {

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

          // FIXME Put this in a service
          Upload.http({
            url: baseUri + '/test-runs/' + this.testRun.id + '/import',
            headers : {
              'Content-Type': 'application/json'
            },
            data: file
          }).then(function () {

            this.load();

          }.bind(this));

        }
      };

      this.load();

    })
    .controller('CreateTestRunCtrl', function (TestRunCreator, $location, $uibModalInstance) {

      this.testRun = {
        env: ''
      };

      this.create = function () {

        TestRunCreator.create(this.testRun)
          .then(function (response) {
            $uibModalInstance.close(response);
          })
          .catch(function () {
            $uibModalInstance.dismiss();
          });
      };

      this.dismiss = function () {
        $uibModalInstance.dismiss();
      };

    })
    .service('TestRunLoader', TestRunLoader)
    .service('TestRunCreator', TestRunCreator)
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
