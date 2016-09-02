'use strict';

var zucchiniModule = require('./module');


function cut(info) {
  var name = info.name;
  var previousOffset = 0;

  var items = [];

  info.arguments
    .filter(function (arg) {
      // Ignorer les arguments non définis
      return _.isString(arg.value) && arg.value !== '';
    })
    .forEach(function (arg) {
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
}


zucchiniModule
  .directive('tcElementInfo', function ($window) {

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

  });
