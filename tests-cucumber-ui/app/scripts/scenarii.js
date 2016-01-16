'use strict';

(function (angular) {

  var ScenarioCoreService = function (ScenarioResource) {

    this.getScenariiByFeatureId = function (featureId) {
      return ScenarioResource.query({ featureId: featureId }).$promise;
    };

    this.getScenario = function (scenarioId) {
      return ScenarioResource.get({ scenarioId: scenarioId }).$promise;
    };

    this.getScenarioHistory = function (scenarioId) {
      return ScenarioResource.getScenarioHistory({ scenarioId: scenarioId }).$promise;
    };

    this.delete = function (scenarioId) {
      return ScenarioResource.delete({ scenarioId: scenarioId }).$promise;
    };

    this.changeStatus = function (scenarioId, status) {
      return ScenarioResource.changeStatus({ id: scenarioId, status: status }).$promise;
    };

    this.createComment = function (scenarioId, content) {
      return ScenarioResource.createComment({ id: scenarioId, content: content }).$promise;
    };

    this.getComments = function (scenarioId) {
      return ScenarioResource.getComments({ scenarioId: scenarioId }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .controller('ScenarioCtrl', function (ScenarioCoreService, FeatureCoreService, TestRunCoreService, $routeParams, $q, $location, historyFilters) {

      this.scenario = {};

      this.load = function () {

        // Load scenario

        return ScenarioCoreService.getScenario($routeParams.scenarioId)
          .then(function (scenario) {
            var featureQ = FeatureCoreService.getById(scenario.featureId);
            var testRunQ = TestRunCoreService.getById(scenario.testRunId);

            return $q.all([featureQ, testRunQ])
              .then(_.spread(function (feature, testRun) {
                scenario.feature = feature;
                scenario.testRun = testRun;

                return scenario;
              }));

          })
          .then(function (scenario) {
            this.scenario = scenario;
          }.bind(this));

      };

      this.loadHistory = function () {
        return ScenarioCoreService.getScenarioHistory(this.scenario.id)
          .then(function (history) {
            this.history = history;
          }.bind(this));
      };

      this.loadComments = function () {
        ScenarioCoreService.getComments(this.scenario.id)
          .then(function (comments) {
            this.comments = comments;
          }.bind(this));
      };

      this.changeStatus = function (status) {
        ScenarioCoreService.changeStatus(this.scenario.id, status)
          .then(function () {
            this.load();
          }.bind(this))
          .then(function () {
            this.loadHistory();
          }.bind(this));
      };

      this.delete = function () {
        ScenarioCoreService.delete(this.scenario.id)
          .then(function () {
            $location.path('/features/' + this.scenario.featureId);
          }.bind(this));
      };


      this.filters = historyFilters.get();

      this.updateStoredFilters = function () {
        historyFilters.save(this.filters);
      }.bind(this);

      this.isHistoryItemDisplayable = function (item) {
        if (this.filters.sameTestRun) {
          return item.testRun.env === this.scenario.testRun.env;
        }
        return true;
      }.bind(this);


      this.load()
        .then(function () {
          this.loadComments();
          this.loadHistory();
        }.bind(this));

    })
    .controller('AddCommentCtrl', function ($scope, $window, ScenarioCoreService) {

      var parentCtrl = $scope.ctrl;

      this.content = '';

      this.addComment = function () {
        return ScenarioCoreService.createComment(parentCtrl.scenario.id, this.content)
          .then(function () {
            this.content = '';
          }.bind(this))
          .then(function () {
            parentCtrl.loadComments();
          });
      };

    })
    .factory('historyFilters', function (ObjectBrowserStorage) {
      return ObjectBrowserStorage.getItem('historyFilters', function () {
        return {
          sameTestRun: true
        };
      });
    })
    .service('ScenarioCoreService', ScenarioCoreService)
    .service('ScenarioResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/scenarii/:scenarioId',
        {
          scenarioId: '@id',
          status: '@status'
        },
        {
          getScenarioHistory: {
            method: 'GET',
            url: baseUri + '/scenarii/:scenarioId/history',
            isArray: true
          },
          changeStatus: {
            method: 'POST',
            url: baseUri + '/scenarii/:scenarioId/changeStatus/:status',
          },
          getComments: {
            method: 'GET',
            url: baseUri + '/scenarii/:scenarioId/comments',
            isArray: true
          },
          createComment: {
            method: 'POST',
            url: baseUri + '/scenarii/:scenarioId/comments/create',
            transformRequest: function (data) {
              // ID must be removed from input data
              delete data.id;
              return angular.toJson(data);
            }
          }
        }
       );
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/scenarii/:scenarioId', {
          templateUrl: 'views/scenario.html',
          controller: 'ScenarioCtrl',
          controllerAs: 'ctrl'
        });
    });


})(angular);
