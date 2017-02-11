'use strict';

var moment = require('moment');

var zucchiniModule = require('./module');


var TestRunCoreService = function ($httpParamSerializer, TestRunResource, Upload, UrlBuilder) {

  this.getLatests = function (withStats) {
    return TestRunResource.query({ withStats: withStats || false }).$promise;
  };

  this.getById = function (testRunId) {
    return TestRunResource.get({ testRunId: testRunId }).$promise;
  };

  this.findByType = function (type) {
    return TestRunResource.query({ type: type, withStats: true }).$promise;
  };

  this.create = function (testRun) {
    return TestRunResource.create(testRun).$promise;
  };

  this.update = function (testRunId, type, labels) {
    return TestRunResource.update({ id: testRunId, type: type, labels: labels }).$promise;
  };

  this.getScenarioDiff = function (leftTestRunId, rightTestRunId) {
    return TestRunResource.getScenarioDiff({ leftTestRunId: leftTestRunId, rightTestRunId: rightTestRunId }).$promise;
  };

  this.importCucumberResults = function (testRunId, file, importOptions) {
    var url = UrlBuilder.createApiUrl('/testRuns/' + testRunId + '/import', importOptions);

    return Upload.http({
      url: url,
      headers : {
        'Content-Type': 'application/json',
      },
      data: file,
    });
  };

  this.delete = function (testRunId) {
    return TestRunResource.delete({ testRunId: testRunId }).$promise;
  };

};

zucchiniModule
  .controller('AllTestRunsCtrl', function (TestRunCoreService, $uibModal, $location, $q, $log) {

    this.load = function () {
      TestRunCoreService.getLatests(true)
        .then(function (latestTestRuns) {
          this.latestTestRuns = latestTestRuns;
        }.bind(this));
    };

    this.openCreateForm = function () {
      var createdModal = $uibModal.open({
        template: require('../views/test-run-create.html'),
        controller: 'CreateTestRunCtrl',
        controllerAs: 'createCtrl',
      });

      createdModal.result
        .then(function (testRun) {
          return TestRunCoreService.create(testRun);
        })
        .then(function (response) {
          $location.path('/test-runs/' + response.id);
        });
    };

    this.openPurgeForm = function () {
      var createdModal = $uibModal.open({
        template: require('../views/test-run-purge.html'),
        controller: 'PurgeTestRunsCtrl',
        controllerAs: 'purgeCtrl',
      });

      createdModal.result
        .then(function (selectedTestRunIds) {
          var deleteTasks = selectedTestRunIds.map(function (testRunId) {
            $log.info('Purged test run', testRunId);
            return TestRunCoreService.delete(testRunId);
          });

          return $q.all(deleteTasks);
        })
        .then(function () {
          this.load();
        }.bind(this));
    }.bind(this);

    this.load();

  })
  .controller('TestRunCtrl', function ($q, $routeParams, $location, $uibModal, TestRunCoreService, FeatureCoreService, ScenarioCoreService, ErrorService, ConfirmationModalService) {

    this.load = function () {

      TestRunCoreService.getById($routeParams.testRunId)
        .then(function (testRun) {

          var featuresQ = FeatureCoreService.getFeaturesByTestRunId(testRun.id);
          var statsQ = ScenarioCoreService.getStatsByTestRunId(testRun.id);
          var historyQ = TestRunCoreService.findByType(testRun.type);

          return $q.all([featuresQ, statsQ, historyQ])
            .then(_.spread(function (features, stats, history) {
              testRun.features = features;
              testRun.stats = stats;
              testRun.history = history;
              return testRun;
            }));

        })
        .then(function (testRun) {
          this.testRun = testRun;

          // TODO Not clean...
          this.history = testRun.history;
          delete testRun.history;
        }.bind(this));
    };

    this.delete = function () {

      return ConfirmationModalService
        .open({
          title: 'Supprimer le tir de tests',
          bodyContent: 'La suppression est irreversible. Êtes-vous sûr de supprimer ce tir ?',
          confirmTitle: 'Supprimer',
        })
        .then(function () {
          return TestRunCoreService.delete(this.testRun.id);
        }.bind(this))
        .then(function () {
          $location.path('/');
        });

    };


    // Import

    this.openImportForm = function () {
      var createdModal = $uibModal.open({
        template: require('../views/import-cucumber-results.html'),
        controller: 'ImportCucumberResultsCtrl',
        controllerAs: 'importCtrl',
      });

      createdModal.result
        .then(function (content) {
          // TODO Manage errors with Cucumber form validation
          if (content.file === null || angular.isUndefined(content.file)) {
            return $q.reject('Fichier de rapport Cucumber non défini');
          }

          return TestRunCoreService.importCucumberResults(this.testRun.id, content.file, content.importOptions)
            .then(function () {
              this.load();
            }.bind(this))
            .catch(function (error) {
              ErrorService.sendError(error);
            });
        }.bind(this));

    };


    // Update test run

    this.openUpdateTestRunForm = function () {
      var createdModal = $uibModal.open({
        template: require('../views/test-run-update.html'),
        controller: 'UpdateTestRunCtrl',
        controllerAs: 'updateCtrl',
        size: 'lg',
        resolve: {
          updateRequest: {
            type: this.testRun.type,
            labels: angular.copy(this.testRun.labels),
          },
        },
      });

      createdModal.result
        .then(function (updateRequest) {
          return TestRunCoreService.update(this.testRun.id, updateRequest.type, updateRequest.labels)
            .then(function () {
              this.load();
            }.bind(this))
            .catch(function (error) {
              ErrorService.sendError(error);
            });
        }.bind(this));

    }.bind(this);


    this.load();

  })
  .controller('CreateTestRunCtrl', function ($uibModalInstance) {

    this.testRun = {
      type: '',
    };

    this.create = function () {
      $uibModalInstance.close(this.testRun);
    };

  })
  .controller('PurgeTestRunsCtrl', function ($uibModalInstance, config, TestRunCoreService) {

    this.testRuns = [];
    this.testRunTypes = [];
    this.selectedTestRunType = null;
    this.selectedTestRunIds = [];

    this.maxDate = moment().add(-config.testRunPurgeDelayInDays, 'day').toDate();

    TestRunCoreService.getLatests(false)
      .then(function (testRuns) {

        this.testRuns = testRuns;

        testRuns.forEach(function (testRun) {
          this.testRunTypes.push(testRun.type);
        }.bind(this));

        this.testRunTypes = _.sortedUniq(this.testRunTypes.sort());

      }.bind(this));

    this.updateSelection = function () {
      if (this.selectedTestRunType) {
        this.selectedTestRunIds = this.testRuns
          .filter(function (testRun) {
            return testRun.type === this.selectedTestRunType && moment(testRun.date) < this.maxDate;
          }.bind(this))
          .map(function (testRun) {
            return testRun.id;
          });
      }
    }.bind(this);

    this.purge = function () {
      $uibModalInstance.close(this.selectedTestRunIds);
    }.bind(this);

  })
  .controller('UpdateTestRunCtrl', function ($uibModalInstance, updateRequest) {

    this.updateRequest = updateRequest;

    this.update = function () {
      $uibModalInstance.close(this.updateRequest);
    }.bind(this);

    this.addNewLabel = function () {
      this.updateRequest.labels.push({
        name: '',
        value: '',
        url: '',
      });
    }.bind(this);

    this.deleteLabel = function (index) {
      this.updateRequest.labels.splice(index, 1);
    }.bind(this);

  })
  .controller('ImportCucumberResultsCtrl', function ($uibModalInstance) {

    this.file = null;
    this.importOptions = {
      group: null,
      dryRun: false,
      onlyNewScenarii: true,
      mergeOnlyNewPassedScenarii: false
    };

    this.import = function () {
      $uibModalInstance.close({
        file: this.file,
        importOptions: this.importOptions,
      });
    };

  })
  .controller('TestRunDiffCtrl', function ($route, $routeParams, $scope, TestRunCoreService, historyStoredFilters) {

    this.baseTestRunId = $routeParams.baseTestRunId;
    this.otherTestRunId = $routeParams.otherTestRunId;

    this.diff = null;

    this.load = function () {

      TestRunCoreService.getLatests(true)
        .then(function (latestTestRuns) {
          this.latestTestRuns = latestTestRuns;
        }.bind(this));

      TestRunCoreService.getById(this.baseTestRunId)
        .then(function (testRun) {
          this.baseTestRun = testRun;
        }.bind(this));

    };

    this.isOtherTestRunSelected = function () {
      return _.isString(this.otherTestRunId);
    }.bind(this);

    this.selectOtherTestRun = function (otherTestRunId) {
      $route.updateParams({ otherTestRunId: otherTestRunId });

      this.otherTestRunId = otherTestRunId;
    }.bind(this);

    this.loadDiff = function () {

      TestRunCoreService.getScenarioDiff(this.otherTestRunId, this.baseTestRunId)
        .then(function (diff) {
          this.diff = diff;
        }.bind(this));

    };

    this.isBaseTestRun = function (testRun) {
      return testRun.id === this.baseTestRunId;
    }.bind(this);


    // History filters

    this.historyFilters = historyStoredFilters.get();

    this.updateHistoryStoredFilters = function () {
      historyStoredFilters.save(this.historyFilters);
    }.bind(this);

    this.isTestRunDisplayable = function (testRun) {
      if (this.historyFilters.sameTestRun) {
        return testRun.type === this.baseTestRun.type;
      }
      return true;
    }.bind(this);


    // Route update

    $scope.$on('$routeUpdate', function () {
      if ($routeParams.otherTestRunId) {
        this.otherTestRunId = $routeParams.otherTestRunId;
        this.loadDiff();
      } else {
        this.otherTestRunId =  null;
        this.diff = null;
      }
    }.bind(this));


    this.load();

    if (this.otherTestRunId) {
      this.loadDiff();
    }

  })
  .service('TestRunCoreService', TestRunCoreService)
  .service('TestRunResource', function ($resource, UrlBuilder) {
    return $resource(
      UrlBuilder.createApiUrl('/testRuns/:testRunId'),
      { testRunId: '@id' },
      {
        create: {
          method: 'POST',
          url: UrlBuilder.createApiUrl('/testRuns/create'),
        },
        update: {
          method: 'PATCH',
          transformRequest: function (data) {
            // ID must be removed from input data
            delete data.id;
            return angular.toJson(data);
          },
        },
        getScenarioDiff: {
          url: UrlBuilder.createApiUrl('/testRuns/:leftTestRunId/scenarioDiff/:rightTestRunId'),
        },
      }
    );
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: require('../views/test-runs.html'),
        controller: 'AllTestRunsCtrl',
        controllerAs: 'ctrl',
      })
      .when('/test-runs/:testRunId', {
        template: require('../views/test-run.html'),
        controller: 'TestRunCtrl',
        controllerAs: 'ctrl',
      })
      .when('/test-runs/:baseTestRunId/diff', {
        template: require('../views/test-run-diff.html'),
        controller: 'TestRunDiffCtrl',
        controllerAs: 'ctrl',
        reloadOnSearch: false,
      });
  });
