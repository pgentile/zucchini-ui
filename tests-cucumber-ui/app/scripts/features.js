'use strict';

(function (angular) {

  var FeatureLoader = function (AllFeaturesResource) {

    this.getFeaturesByTestRunId = function (testRunId) {
      return AllFeaturesResource.query({ testRunId: testRunId }).$promise;
    };

    this.getById = function (featureId) {
      return AllFeaturesResource.get({ featureId: featureId }).$promise;
    };

    this.getStats = function (featureId) {
      return AllFeaturesResource.getStats({ featureId: featureId }).$promise;
    };

    this.delete = function (featureId) {
      return AllFeaturesResource.delete({ featureId: featureId}).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .controller('FeatureCtrl', function ($routeParams, $q, $location, FeatureLoader, TestRunLoader, ScenarioLoader) {

      this.load = function () {

        FeatureLoader.getById($routeParams.featureId)
          .then(function (feature) {

            var testRunQ = TestRunLoader.getById(feature.testRunId);
            var scenariiQ = ScenarioLoader.getScenariiByFeatureId(feature.id);
            var statsQ = FeatureLoader.getStats(feature.id);

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

      this.delete = function () {
        FeatureLoader.delete(this.feature.id).then(function () {
          $location.path('/test-runs/' + this.feature.testRun.id);
        }.bind(this));
      };

      this.load();

    })
    .service('FeatureLoader', FeatureLoader)
    .service('AllFeaturesResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/features/:featureId',
        { featureId: '@id' },
        {
          getStats: {
            method: 'GET',
            url: baseUri + '/features/:featureId/stats',
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
