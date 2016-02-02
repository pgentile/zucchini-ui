(function (angular) {
  'use strict';

  var ScenarioCoreService = function (ScenarioResource) {

    this.getScenariiByFeatureId = function (featureId) {
      return ScenarioResource.query({ featureId: featureId }).$promise;
    };

    this.getScenariiByTestRunIdAndTag = function (testRunId, tag) {
      return ScenarioResource.query({ testRunId: testRunId, tag: tag }).$promise;
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

    this.getComment = function (scenarioId, commentId) {
      return ScenarioResource.getComment({ scenarioId: scenarioId, commentId: commentId }).$promise;
    };

    this.getTagsByTestRunId = function (testRunId) {
      return ScenarioResource.getTags({ testRunId: testRunId }).$promise;
    };

    this.getStatsByTestRunId = function (testRunId) {
      return ScenarioResource.getStats({ testRunId: testRunId }).$promise;
    };

    this.getStatsByFeatureId = function (featureId) {
      return ScenarioResource.getStats({ featureId: featureId }).$promise;
    };

    this.getStatsByTestRunIdAndTag = function (testRunId, tag) {
      return ScenarioResource.getStats({ testRunId: testRunId, tag: tag }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .controller('ScenarioCtrl', function (ScenarioCoreService, FeatureCoreService, TestRunCoreService, ConfirmationModalService, $routeParams, $q, $location, historyFilters, stepFilters) {

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

        return ConfirmationModalService
          .open({
            title: 'Supprimer le scénario',
            bodyContent: 'La suppression est irreversible. Êtes-vous sûr de supprimer ce scénario ?',
            confirmTitle: 'Supprimer'
          })
          .then(function () {
            return ScenarioCoreService.delete(this.scenario.id);
          }.bind(this))
          .then(function () {
            $location.path('/features/' + this.scenario.featureId);
          }.bind(this));

      };

      this.maxDisplayedComments = 5;
      this.limitMaxDisplayedComments = true;

      this.loadComments = function () {
        ScenarioCoreService.getComments(this.scenario.id)
          .then(function (comments) {
            this.comments = comments;
          }.bind(this));
      };

      this.loadNewComment = function (newCommentId) {
        return ScenarioCoreService.getComment(this.scenario.id, newCommentId)
          .then(function (comment) {
            this.comments.unshift(comment);
          }.bind(this));
      };

      this.isCommentFromSameTestRun = function (comment) {
        var testRunReference = comment.references.filter(function (reference) {
          return reference.type === 'TEST_RUN_ID';
        });
        if (testRunReference.length === 0) {
          return false;
        }

        var commentTestRunId = testRunReference[0].reference;
        return commentTestRunId === this.scenario.testRunId;
      }.bind(this);

      this.limitDisplayedComments = function (comment, index) {
        if (index < this.maxDisplayedComments) {
          return true;
        }
        return !this.limitMaxDisplayedComments;
      }.bind(this);


      this.loadHistory = function () {
        return ScenarioCoreService.getScenarioHistory(this.scenario.id)
          .then(function (history) {
            this.history = history;
          }.bind(this));
      };

      this.historyFilters = historyFilters.get();

      this.updateStoredHistoryFilters = function () {
        historyFilters.save(this.historyFilters);
      }.bind(this);

      this.isHistoryItemDisplayable = function (item) {
        if (this.historyFilters.sameTestRun) {
          return item.testRun.env === this.scenario.testRun.env;
        }
        return true;
      }.bind(this);


      this.stepFilters = stepFilters.get();

      this.updateStoredStepFilters = function () {
        stepFilters.save(this.stepFilters);
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
          .then(function (response) {
            this.content = '';

            return parentCtrl.loadNewComment(response.id);
          }.bind(this));
      };

    })
    .factory('historyFilters', function (ObjectBrowserStorage) {
      return ObjectBrowserStorage.getItem('historyFilters', function () {
        return {
          sameTestRun: true
        };
      });
    })
    .factory('stepFilters', function (ObjectBrowserStorage) {
      return ObjectBrowserStorage.getItem('stepFilters', function () {
        return {
          comments: true,
          context: true,
          beforeAndAfterActions: true,
          errorDetails: true
        };
      });
    })
    .service('ScenarioCoreService', ScenarioCoreService)
    .service('ScenarioResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/scenarii/:scenarioId',
        {
          scenarioId: '@id',
          status: '@status',
          commentId: '@commentId'
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
          getComment: {
            method: 'GET',
            url: baseUri + '/scenarii/:scenarioId/comments/:commentId'
          },
          createComment: {
            method: 'POST',
            url: baseUri + '/scenarii/:scenarioId/comments/create',
            transformRequest: function (data) {
              // ID must be removed from input data
              delete data.id;
              return angular.toJson(data);
            }
          },
          getTags: {
            method: 'GET',
            url: baseUri + '/scenarii/tags',
            isArray: true
          },
          getStats: {
            method: 'GET',
            url: baseUri + '/scenarii/stats'
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
