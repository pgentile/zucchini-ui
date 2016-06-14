(function (angular) {
  'use strict';

  var UrlBuilder = function ($httpParamSerializer, config) {

    this.createApiUrl = function (path, queryParams) {
      var url = _.trimEnd(config.backendBaseUri, '/') + '/api/' + _.trimStart(path, '/');
      if (!_.isUndefined(queryParams) && queryParams.length > 0) {
        url += '?' + $httpParamSerializer(queryParams);
      }
      return url;
    };

  };

  angular.module('testsCucumberApp')
    .service('UrlBuilder', UrlBuilder);

})(angular);
