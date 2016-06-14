(function (angular) {
  'use strict';

  var UrlBuilder = function ($httpParamSerializer, baseUri) {

    this.createApiUrl = function (path, queryParams) {
      var url = _.trimEnd(baseUri, '/') + '/' + _.trimStart(path, '/');
      if (!_.isUndefined(queryParams) && queryParams.length > 0) {
        url += '?' + $httpParamSerializer(queryParams);
      }
      return url;
    };

  };

  angular.module('testsCucumberApp')
    .service('UrlBuilder', UrlBuilder);

})(angular);
