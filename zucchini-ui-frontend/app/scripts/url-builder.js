'use strict';

var zucchiniModule = require('./module');


var UrlBuilder = function ($httpParamSerializer, config) {

  this.createApiUrl = function (path, queryParams) {
    var url = _.trimEnd(config.backendBaseUri, '/') + '/api/' + _.trimStart(path, '/');
    if (!_.isUndefined(queryParams)) {
      url += '?' + $httpParamSerializer(queryParams);
    }
    return url;
  };

  this.createWebSocketUrl = function (path, queryParams) {
    var parts = _.split(config.backendBaseUri, '://', 2);
    var baseProtocol = parts[0];
    var remainingUrl = parts[1];

    var protocol = 'ws';
    if (baseProtocol === 'https') {
      protocol = 'wss';
    }

    var url = protocol + '://' + _.trimEnd(remainingUrl, '/') + '/ws/' + _.trimStart(path, '/');
    if (!_.isUndefined(queryParams)) {
      url += '?' + $httpParamSerializer(queryParams);
    }
    return url;
  };

};

zucchiniModule
  .service('UrlBuilder', UrlBuilder);
