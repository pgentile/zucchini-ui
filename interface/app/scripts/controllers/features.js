'use strict';

(function (angular) {

  var FeatureLoader = function (AllFeaturesResource) {

    this.getFeaturesByTestRunId = function (testRunId) {
      return AllFeaturesResource.query({ testRunId: testRunId }).$promise;
    };

    this.getById = function (featureId) {
      return AllFeaturesResource.get({ featureId: featureId }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .controller('FeatureCtrl', function ($routeParams, $q, FeatureLoader, TestRunLoader, ScenarioLoader) {
      this.load = function () {

        FeatureLoader.getById($routeParams.featureId)
          .then(function (feature) {

            var testRunQ = TestRunLoader.getById(feature.testRunId);
            var scenariiQ = ScenarioLoader.getScenariiByFeatureId(feature.id);

            return $q.all([testRunQ, scenariiQ])
              .then(function (items) {
                feature.testRun = items[0];
                feature.scenarii = items[1];
                return feature;
              });

          })
          .then(function (feature) {
            this.feature = feature;
          }.bind(this));

      };

      this.load();

    })
    .service('FeatureLoader', FeatureLoader)
    .service('AllFeaturesResource', function ($resource, baseUri) {
      return $resource(baseUri + '/features/:featureId', { featureId: '@id' });
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/features/:featureId', {
          templateUrl: 'views/feature.html',
          controller: 'FeatureCtrl',
          controllerAs: 'ctrl'
        });
    })
    .directive('tcStatus', function () {
      return {
        restrict: 'E',
        scope: {
          status: '=status'
        },
        templateUrl: 'views/tc-status.html'
      };
    });


})(angular);
