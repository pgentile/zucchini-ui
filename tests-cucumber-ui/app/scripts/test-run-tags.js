(function (angular) {
  'use strict';

  angular.module('testsCucumberApp')
    .controller('TestRunTagsCtrl', function ($routeParams, $q, TestRunCoreService, ScenarioCoreService) {

      this.load = function () {

        var testRunQ = TestRunCoreService.getById($routeParams.testRunId);
        var tagsQ = ScenarioCoreService.getTagsByTestRunId($routeParams.testRunId);

        return $q.all([testRunQ, tagsQ])
          .then(_.spread(function (testRun, tags) {
            testRun.tags = tags;
            return testRun;
          }))
          .then(function (testRun) {
            this.testRun = testRun;
          }.bind(this));
      };


      // Filter tags

      this.filteredTags = '';

      this.clearTagsFilter = function () {
        this.filteredTags = '';
      };

      this.isAcceptedTag = function (tag) {
        if (this.filteredTags.length > 0) {
          return _.isString(tag.tag) && tag.tag.startsWith(this.filteredTags);
        }
        return true;
      }.bind(this);


      this.load();

    })
    .controller('TestRunTagCtrl', function ($q, $route, $routeParams, TestRunCoreService, FeatureCoreService, ScenarioCoreService) {

      if (_.isString($routeParams.tag)) {
        this.tags = [$routeParams.tag];
      } else {
        this.tags = $routeParams.tag;
      }

      if (_.isString($routeParams.excludedTag)) {
        this.excludedTags = [$routeParams.excludedTag];
      } else {
        this.excludedTags = $routeParams.excludedTag;
      }

      this.load = function () {

        var testRunQ = TestRunCoreService.getById($routeParams.testRunId);
        var scenariiQ = ScenarioCoreService.getScenariiByTestRunIdAndTag($routeParams.testRunId, this.tags, this.excludedTags);
        var featuresQ = FeatureCoreService.getFeaturesByTestRunIdAndTag($routeParams.testRunId, this.tags, this.excludedTags);
        var statsQ = ScenarioCoreService.getStatsByTestRunIdAndTag($routeParams.testRunId, this.tags, this.excludedTags);

        return $q.all([testRunQ, scenariiQ, featuresQ, statsQ])
          .then(_.spread(function (testRun, scenarii, features, stats) {

            // Attach features to scenarii

            var featuresById = {};
            features.forEach(function (feature) {
              featuresById[feature.id] = feature;
            });

            scenarii.forEach(function (scenario) {
              scenario.feature = featuresById[scenario.featureId];
            });

            // Sort scenarii by feature name, then scenario name

            scenarii.sort(function (left, right) {
              var featureNameComparison = left.feature.info.name.localeCompare(right.feature.info.name);
              if (featureNameComparison === 0) {
                return left.info.name.localeCompare(right.info.name);
              }
              return featureNameComparison;
            });

            this.testRun = testRun;
            this.scenarii = scenarii;
            this.features = features;
            this.stats = stats;
          }.bind(this)));
      };


      this.updateRouteForTags = function () {
        $route.updateParams({
          tag: this.tags,
          excludedTag: this.excludedTags
        });
      };


      this.selectedFeatureId = null;

      this.selectFeatureId = function (featureId) {
        this.selectedFeatureId = featureId;
      }.bind(this);

      this.clearSelectedFeatureIds = function () {
        this.selectedFeatureId = null;
      }.bind(this);

      this.isFeatureDisplayable = function (feature) {
        if (this.selectedFeatureId === null) {
          return true;
        }
        return this.selectedFeatureId === feature.id;
      }.bind(this);

      this.isScenarioDisplayable = function (scenario) {
        if (this.selectedFeatureId === null) {
          return true;
        }
        return this.selectedFeatureId === scenario.featureId;
      }.bind(this);


      this.load();

    })
    .config(function ($routeProvider) {
        $routeProvider.when('/test-runs/:testRunId/tags', {
          templateUrl: 'views/test-run-tags.html',
          controller: 'TestRunTagsCtrl',
          controllerAs: 'ctrl'
        })
        .when('/test-runs/:testRunId/tagDetails', {
          templateUrl: 'views/test-run-tag.html',
          controller: 'TestRunTagCtrl',
          controllerAs: 'ctrl'
        });
    });

})(angular);
