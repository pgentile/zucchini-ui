'use strict';

(function (angular) {

  angular.module('testsCucumberApp')
    .directive('tcStatus', function () {
      return {
        restrict: 'E',
        scope: {
          status: '=status'
        },
        templateUrl: 'views/tc-status.html'
      };
    })
    .directive('tcTestRunStatus', function () {
      return {
        restrict: 'E',
        scope: {
          status: '=status'
        },
        templateUrl: 'views/tc-test-run-status.html'
      };
    })
    .directive('tcTags', function () {
      return {
        restrict: 'E',
        scope: {
          tags: '=tags'
        },
        templateUrl: 'views/tc-tags.html'
      };
    })
    .directive('tcElementInfo', function ($window) {

      var cut = function (info) {
        var name = info.name;
        var previousOffset = 0;

        var items = [];

        info.arguments.forEach(function (arg) {
          // Ignorer les arguments non définis
          if (arg.value === null) {
            return;
          }

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

          if (angular.isUndefined(info)) {
            return;
          }

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
              newElement = $window.document.createTextNode(part.value);
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

    })
    .directive('tcLineBreaks', function ($window) {

      var link = function (scope, element) {

        scope.$watch('content', function (content) {
          element.empty();

          if (content) {
            var parts = content.trim().split('\n');

            var textElement = $window.document.createTextNode(parts[0]);
            element.append(textElement);

            for (var i = 1; i < parts.length; i++) {
              var brElement = angular.element('<br></br>');
              element.append(brElement);

              var nextTextElement = $window.document.createTextNode(parts[i]);
              element.append(nextTextElement);
            }
          }

        });

      };

      return {
        restrict: 'E',
        scope: {
          content: '=content'
        },
        link: link
      };

    });


})(angular);
