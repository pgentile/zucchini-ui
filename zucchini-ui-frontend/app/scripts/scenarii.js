'use strict';

var zucchiniModule = require('./module');


var ScenarioCoreService = function (ScenarioResource) {

  this.getScenariiByFeatureId = function (featureId) {
    return ScenarioResource.query({ featureId: featureId }).$promise;
  };

  this.getScenariiByTestRunIdAndTag = function (testRunId, tag, excludedTag) {
    return ScenarioResource.query({ testRunId: testRunId, tag: tag, excludedTag: excludedTag }).$promise;
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

  this.changeStatus = function (scenarioId, newStatus) {
    return ScenarioResource.update({ id: scenarioId, status: newStatus }).$promise;
  };

  this.changeReviewState = function (scenarioId, reviewState) {
    return ScenarioResource.update({ id: scenarioId, reviewed: reviewState }).$promise;
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

  this.updateComment = function (scenarioId, commentId, newContent) {
    return ScenarioResource.updateComment({ id: scenarioId, commentId: commentId, content: newContent }).$promise;
  };

  this.deleteComment = function (scenarioId, commentId) {
    return ScenarioResource.deleteComment({ scenarioId: scenarioId, commentId: commentId }).$promise;
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

  this.getStatsByTestRunIdAndTag = function (testRunId, tag, excludedTag) {
    return ScenarioResource.getStats({ testRunId: testRunId, tag: tag, excludedTag: excludedTag }).$promise;
  };

};


zucchiniModule
  .controller('ScenarioCtrl', function (ScenarioCoreService, FeatureCoreService, TestRunCoreService, ConfirmationModalService, PresenceService, $routeParams, $q, $location, $filter, $scope, historyStoredFilters, stepFilters) {

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

    this.changeStatus = function (newStatus) {
      ScenarioCoreService.changeStatus(this.scenario.id, newStatus)
        .then(function () {
          this.load();
        }.bind(this))
        .then(function () {
          this.loadHistory();
        }.bind(this));
    };

    this.changeReviewState = function (reviewState) {
      ScenarioCoreService.changeReviewState(this.scenario.id, reviewState)
        .then(function () {
          this.load();
        }.bind(this));
    };

    this.delete = function () {

      return ConfirmationModalService
        .open({
          title: 'Supprimer le scénario',
          bodyContent: 'La suppression est irreversible. Êtes-vous sûr de supprimer ce scénario ?',
          confirmTitle: 'Supprimer',
        })
        .then(function () {
          return ScenarioCoreService.delete(this.scenario.id);
        }.bind(this))
        .then(function () {
          $location.path('/features/' + this.scenario.featureId);
        }.bind(this));

    };


    this.loadHistory = function () {
      return ScenarioCoreService.getScenarioHistory(this.scenario.id)
        .then(function (history) {
          this.history = history;
        }.bind(this));
    };

    this.historyFilters = historyStoredFilters.get();

    this.updateHistoryStoredFilters = function () {
      historyStoredFilters.save(this.historyFilters);
    }.bind(this);

    this.isHistoryItemDisplayable = function (item) {
      if (this.historyFilters.sameTestRun) {
        return item.testRun.type === this.scenario.testRun.type;
      }
      return true;
    }.bind(this);

    this.stepFilters = stepFilters.get();

    this.updateStoredStepFilters = function () {
      stepFilters.save(this.stepFilters);
    }.bind(this);

    // Load scenario

    this.load()
      .then(function () {
        this.loadHistory();
      }.bind(this));


    // Start presence service

    this.presence = {
      otherWatchers: [],
      known: false,
    };

    PresenceService.onOtherWatchersUpdated(function (otherWatchers) {
      $scope.$apply(function () {
        this.presence.known = true;
        this.presence.otherWatchers = otherWatchers;
      }.bind(this));
    }.bind(this));

    PresenceService.onConnectionLost(function () {
      $scope.$apply(function () {
        this.presence.known = false;
      }.bind(this));
    }.bind(this));

    PresenceService.watchReference({
      type: 'SCENARIO_ID',
      reference: $routeParams.scenarioId,
    });

    // Unwatch on controller destruction
    $scope.$on('$destroy', function () {
      PresenceService.unwatch();
    });

  })
  .controller('ScenarioCommentsCtrl', function ($scope, $filter, ScenarioCoreService, TestRunCoreService, ConfirmationModalService) {

    this.maxDisplayedComments = 5;
    this.limitMaxDisplayedComments = true;

    this.getCommentReference = $filter('commentReference');

    this.loadComments = function () {
      ScenarioCoreService.getComments(this.scenario.id)
        .then(function (comments) {

          comments.map(function (comment) {
            var testRunId = this.getCommentReference(comment, 'TEST_RUN_ID');
            TestRunCoreService.getById(testRunId).then(function (testRun) {
              comment.testRun = testRun;
            });
          }.bind(this));

          this.comments = comments;

        }.bind(this));
    };

    this.isCommentFromSameTestRun = function (comment) {
      var commentTestRunId = this.getCommentReference(comment, 'TEST_RUN_ID');
      return commentTestRunId === this.scenario.testRunId;
    }.bind(this);

    this.limitDisplayedComments = function (comment, index) {
      if (index < this.maxDisplayedComments) {
        return true;
      }
      return !this.limitMaxDisplayedComments;
    }.bind(this);

    this.deleteComment = function (comment) {
      ConfirmationModalService
        .open({
          title: 'Supprimer le commentaire',
          bodyContent: 'La suppression est irreversible. Êtes-vous sûr de supprimer ce commentaire ?',
          confirmTitle: 'Supprimer',
        })
        .then(function () {
          return ScenarioCoreService.deleteComment(this.scenario.id, comment.id);
        }.bind(this))
        .then(function () {

          _.remove(this.comments, function (someComment) {
            return comment.id === someComment.id;
          });

        }.bind(this));
    }.bind(this);


    $scope.$watch('ctrl.scenario', function (scenario) {
      if (scenario) {
        this.scenario = scenario;
        this.loadComments();
      }
    }.bind(this));

  })
  .controller('AddCommentCtrl', function ($scope, ScenarioCoreService) {

    var parentCtrl = $scope.commentsCtrl;

    this.content = '';

    this.addComment = function () {
      return ScenarioCoreService.createComment(parentCtrl.scenario.id, this.content)
        .then(function () {
          this.content = '';
        }.bind(this))
        .then(function () {
          return parentCtrl.loadComments();
        }.bind(this));
    };

  })
  .controller('EditCommentCtrl', function (ScenarioCoreService, $scope, $filter) {

    var parentCtrl = $scope.commentsCtrl;

    var getCommentReference = $filter('commentReference');

    this.save = function (comment) {
      var scenarioId = getCommentReference(comment, 'SCENARIO_ID');
      return ScenarioCoreService.updateComment(scenarioId, comment.id, comment.content)
        .then(function () {
          comment.edit = false;
        })
        .then(function () {
          return parentCtrl.loadComments();
        });
    };

  })
  .factory('stepFilters', function (BrowserSessionStorage) {
    return BrowserSessionStorage.getItem('stepFilters', function () {
      return {
        comments: true,
        context: true,
        beforeAndAfterActions: true,
        errorDetails: true,
        logs: true,
        attachments: true,
      };
    });
  })
  .filter('commentReference', function () {

    return function (comment, referenceType) {
      var testRunReference = _.find(comment.references, function (reference) {
        return reference.type === referenceType;
      });
      if (testRunReference) {
        return testRunReference.reference;
      }
    };

  })
  .service('ScenarioCoreService', ScenarioCoreService)
  .service('ScenarioResource', function ($resource, UrlBuilder) {
    return $resource(
      UrlBuilder.createApiUrl('/scenarii/:scenarioId'),
      {
        scenarioId: '@id',
        status: '@status',
        commentId: '@commentId',
      },
      {
        getScenarioHistory: {
          method: 'GET',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/history'),
          isArray: true,
        },
        update: {
          method: 'PATCH',
          transformRequest: function (data) {
            // ID must be removed from input data
            delete data.id;
            return angular.toJson(data);
          },
        },
        changeStatus: {
          method: 'POST',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/changeStatus'),
          transformRequest: function (data) {
            // ID must be removed from input data
            delete data.id;
            return angular.toJson(data);
          },
        },
        changeReviewState: {
          method: 'POST',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/changeReviewState'),
          transformRequest: function (data) {
            // ID must be removed from input data
            delete data.id;
            return angular.toJson(data);
          },
        },
        getComments: {
          method: 'GET',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/comments'),
          isArray: true,
        },
        getComment: {
          method: 'GET',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/comments/:commentId'),
        },
        deleteComment: {
          method: 'DELETE',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/comments/:commentId'),
        },
        updateComment: {
          method: 'PATCH',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/comments/:commentId'),
          transformRequest: function (data) {
            // ID must be removed from input data
            delete data.id;
            delete data.commentId;
            return angular.toJson(data);
          },
        },
        createComment: {
          method: 'POST',
          url: UrlBuilder.createApiUrl('/scenarii/:scenarioId/comments/create'),
          transformRequest: function (data) {
            // ID must be removed from input data
            delete data.id;
            return angular.toJson(data);
          },
        },
        getTags: {
          method: 'GET',
          url: UrlBuilder.createApiUrl('/scenarii/tags'),
          isArray: true,
        },
        getStats: {
          method: 'GET',
          url: UrlBuilder.createApiUrl('/scenarii/stats'),
        },
      }
     );
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/scenarii/:scenarioId', {
        template: require('../views/scenario.html'),
        controller: 'ScenarioCtrl',
        controllerAs: 'ctrl',
      });
  });
