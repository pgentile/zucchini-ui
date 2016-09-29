'use strict';

var zucchiniModule = require('./module');


function tokenizeUrls(content) {
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
}


function tokenize(content) {
  if (!content) {
    return [];
  }

  var lines = content.trim().split('\n');
  var tokens = _.flatten(lines.map(function (line) {
    return tokenizeUrls(line).concat([['eol']]);
  }));

  return tokens;
}


zucchiniModule
  .directive('tcSimpleText', function ($window) {

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

  });
