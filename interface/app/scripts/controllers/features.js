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
    .controller('FeatureCtrl', function ($routeParams, FeatureLoader, TestRunLoader) {
      this.load = function () {
        FeatureLoader.getById($routeParams.featureId)
          .then(function (feature) {

            return TestRunLoader.getById(feature.testRunId)
              .then(function (testRun) {
                feature.testRun = testRun;
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
    });


})(angular);
