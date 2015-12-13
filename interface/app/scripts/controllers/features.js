'use strict';

(function (angular, document) {

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
    })
    .directive('tcElementInfo', function () {

      var cut = function (info) {
        var name = info.name;
        var previousOffset = 0;

        var items = [];

        info.arguments.forEach(function (arg) {
          // Ajouter le contenu avant l'argument
          var before = name.substring(previousOffset, arg.offset);
          if (before.length > 0) {
            items.push({ type: 'text', value: before });
          }

          // Extraire la valeur de l'argument
          items.push({ type: 'arg', value: arg.value });

          previousOffset = arg.offset + arg.value.length;
        });

        // Ajouter le contenu restant
        var remaining = name.substring(previousOffset);
        if (remaining.length > 0) {
          items.push({ type: 'text', value: remaining });
        }

        return items;
      };

      var link = function (scope, element) {

        scope.$watch('info', function (info) {
          element.empty();

          // Keyword
          var keywordElem = angular.element('<b></b>');
          keywordElem.text(info.keyword);
          element.append(keywordElem);

          element.append(' ');

          // Name
          cut(info).forEach(function (part) {
            var newElement;
            if (part.type === 'arg') {
              newElement = angular.element('<code></code>');
              newElement.text(part.value);
            } else {
              newElement = document.createTextNode(part.value);
            }
            element.append(newElement);
          });

        });

      };

      return {
        restrict: 'E',
        scope: {
          info: '=info'
        },
        link: link
      };

    });


})(angular, window.document);
