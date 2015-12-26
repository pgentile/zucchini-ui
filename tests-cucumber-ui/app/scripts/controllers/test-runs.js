'use strict';

(function (angular) {

  var TestRunLoader = function ($q, AllTestRunsResource) {

    this.getLatests = function () {
      return AllTestRunsResource.query().$promise;
    };

    this.getById = function (testRunId) {
      return AllTestRunsResource.get({ testRunId: testRunId }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .controller('AllTestRunsCtrl', function ($log, TestRunLoader) {

      this.load = function () {
        TestRunLoader.getLatests()
          .then(function (latestTestRuns) {
            this.latestTestRuns = latestTestRuns;
          }.bind(this));
      };

      this.load();

    })
    .controller('TestRunCtrl', function ($routeParams, TestRunLoader, FeatureLoader) {

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

      this.load();

    })
    .service('TestRunLoader', TestRunLoader)
    .service('AllTestRunsResource', function ($resource, baseUri) {
      return $resource(baseUri + '/test-runs/:testRunId', { testRunId: '@id' });
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
