'use strict';

(function (angular) {

  angular.module('testsCucumberApp')
    .directive('tcStatus', function () {
      return {
        restrict: 'E',
        scope: {
          status: '='
        },
        templateUrl: 'views/tc-status.html'
      };
    })
    .directive('tcTags', function () {
      return {
        restrict: 'E',
        scope: {
          tags: '='
        },
        templateUrl: 'views/tc-tags.html'
      };
    })
    .directive('tcProgress', function () {
      return {
        restrict: 'E',
        scope: {
          total: '=',
          success: '=',
          warning: '=',
          danger: '='
        },
        templateUrl: 'views/tc-progress.html'
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

      var link = function (scope, element, attrs) {

        attrs.$observe('info', function (infoAttr) {
          scope.$watch(infoAttr, function (info) {

            element.empty();

            if (angular.isUndefined(info)) {
              return;
            }

            // Keyword
            var keywordElem = angular.element('<b></b>');
            keywordElem.text(info.keyword);
            element.append(keywordElem);

            var spaceElement = $window.document.createTextNode(' ');
            element.append(spaceElement);

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
        });

      };

      return {
        restrict: 'E',
        scope: false,
        link: link
      };

    })
    .directive('tcLineBreaks', function ($window) {

      var link = function (scope, element, attrs) {

        attrs.$observe('content', function (contentAttr) {
            scope.$watch(contentAttr, function (content) {

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
        });

      };

      return {
        restrict: 'E',
        scope: false,
        link: link
      };

    });


})(angular);
