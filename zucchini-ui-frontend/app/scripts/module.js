var angular = require('angular');
var angularResource = require('angular-resource');
var angularRoute = require('angular-route');
var angularElastic = require('angular-elastic');
var angularLoadingBar = require('angular-loading-bar');
var angularUiBootstrap = require('angular-ui-bootstrap');
var angularFileUpload = require('ng-file-upload');


var zucchiniModule = angular.module('zucchini-ui-frontend', [
  angularResource,
  angularRoute,
  angularUiBootstrap,
  angularFileUpload,
  angularLoadingBar,
  angularElastic,
]);


module.exports = zucchiniModule;
