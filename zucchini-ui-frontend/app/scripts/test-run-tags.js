(function (angular) {
  'use strict';


  function anyTagTypeToArray(value) {
    if (_.isEmpty(value)) {
      return [];
    } else if (_.isString(value)) {
      return [value];
    }
    return value;
  }


  function tagStringToParamValue(value) {
    if (_.isEmpty(value)) {
      return;
    }

    var tags = value.split(' ')
    .map(_.trim)
    .filter(function (v) {
      return !_.isEmpty(v);
    });

    if (tags.length === 0) {
      return;
    }

    return tags;
  }


  angular.module('zucchini-ui-frontend')
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
    .controller('TestRunTagCtrl', function ($q, $route, $routeParams, $scope, TestRunCoreService, FeatureCoreService, ScenarioCoreService) {

      this.updateTags = function () {
        this.tags = anyTagTypeToArray($routeParams.tag);
        this.excludedTags = anyTagTypeToArray($routeParams.excludedTag);

        this.tagsInput = this.tags.join(' ');
        this.excludedTagsInput = this.excludedTags.join(' ');
      };

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
          tag: tagStringToParamValue(this.tagsInput),
          excludedTag: tagStringToParamValue(this.excludedTagsInput),
        });
      }.bind(this);


      // Feature filters

      this.selectedFeatureIds = undefined;

      this.updateFeatureIds = function (featureIds) {
        this.selectedFeatureIds = featureIds;
      }.bind(this);

      this.isFeatureIdSelected = function (scenario) {
        return _.isUndefined(this.selectedFeatureIds) || this.selectedFeatureIds.indexOf(scenario.featureId) !== -1;
      }.bind(this);


      // Route update

      $scope.$on('$routeUpdate', function () {
        this.updateTags();
        this.load();
      }.bind(this));


      this.updateTags();
      this.load();

    })
    .filter('prefixAndJoin', function () {
      return function (input, prefix, joiner) {
        return input.map(function (item) {
          return prefix + item;
        }).join(joiner);
      };
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
          controllerAs: 'ctrl',
          reloadOnSearch: false
        });
    });

})(angular);
