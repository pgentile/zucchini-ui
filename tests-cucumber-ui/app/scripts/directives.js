(function (angular) {
  'use strict';

  angular.module('testsCucumberApp')
    .directive('tcElementInfo', function ($window) {

      var cut = function (info) {
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
    .directive('tcSimpleText', function ($window) {

      var tokenizeUrls = function (content) {
        var tokens = [];

        var urlPattern = new RegExp('(https?://[^ ]+)', 'ig');

        var lastIndex = 0;
        var result;
        while ((result = urlPattern.exec(content)) !== null) {
          if (result.index > lastIndex) {
            tokens.push(['text', content.substring(lastIndex, result.index)]);
          }

          var url = result[1];
          var remaining = '';

          var specialChars = ',.;';
          for (var i = 0; i < specialChars.length; i++) {
            var specialChar = specialChars[i];
            if (url.endsWith(specialChar)) {
              url = url.substring(0, url.length - 1);
              remaining = specialChar;
              break;
            }
          }

          tokens.push(['url', url]);
          if (remaining) {
            tokens.push(['text', remaining]);
          }

          lastIndex = result.index + result[0].length;
        }

        if (lastIndex < content.length) {
          tokens.push(['text', content.substring(lastIndex)]);
        }

        return tokens;
      };

      var tokenize = function (content) {
        if (!content) {
          return [];
        }

        var lines = content.trim().split('\n');
        var tokens = _.flatten(lines.map(function (line) {
          return tokenizeUrls(line).concat([['eol']]);
        }));

        return tokens;
      };

      var link = function (scope, element, attrs) {

        attrs.$observe('content', function (contentAttr) {
            scope.$watch(contentAttr, function (content) {

              element.empty();

              var tokens = tokenize(content);
              tokens.forEach(function (token) {

                switch (token[0]) {
                  case 'text':
                    var textElement = $window.document.createTextNode(token[1]);
                    element.append(textElement);
                    break;

                  case 'eol':
                    var brElement = angular.element('<br>');
                    element.append(brElement);
                    break;

                  case 'url':
                    var urlElement = angular.element('<a>');
                    urlElement.attr('href', token[1]);
                    urlElement.text(token[1]);
                    element.append(urlElement);
                    break;

                  default:
                    // Nothing to do
                    break;
                }

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
    .directive('tcPieChart', function () {

      var link = function (scope, element) {

        // Attach chart to current element
        var chart = new Chartist.Pie(element[0]);

        // Update chart on attribute changes
        scope.$watchGroup(['data', 'total'], function (newValues) {
          var data, total;
          [data, total] = newValues;

          chart.update(data, {
            total: total,
            donut: true,
          }, true);
        });

        // Release chart resources on directive destroy
        scope.$on('$destroy', function () {
          chart.detach();
        });

      };

      return {
        restrict: 'E',
        scope: {
          data: '=',
          total: '='
        },
        link: link
      };

    });

})(angular);
