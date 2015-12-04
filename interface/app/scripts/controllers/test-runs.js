'use strict';

(function (angular) {

  var TestRunLoader = function ($log, $q, AllTestRunsResource, AllFeaturesResource) {

    this.getLatests = function () {
      $log.info('Loading test runs');

      return AllTestRunsResource.query().$promise
        .then(function (latestTestRuns) {
          $log.info('Loaded test runs');

          return $q.all(latestTestRuns.map(function (testRun) {
            $log.info('Loading test run', testRun.id);

            AllFeaturesResource.query({testRunId: testRun.id}).$promise
              .then(function (features) {
                testRun.features = features;
              });
          })).then(function () {
            $log.info('All loaded:', latestTestRuns.length);
            return latestTestRuns;
          });
        });
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
    .service('TestRunLoader', TestRunLoader)
    .service('AllTestRunsResource', function ($resource, baseUri) {
      return $resource(baseUri + '/test-runs');
    })
    .service('AllFeaturesResource', function ($resource, baseUri) {
      return $resource(baseUri + '/features');
    });

})(angular);






