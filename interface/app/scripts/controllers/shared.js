'use strict';

(function (angular, document) {

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
    .directive('tcTags', function () {
      return {
        restrict: 'E',
        scope: {
          tags: '=tags'
        },
        templateUrl: 'views/tc-tags.html'
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
