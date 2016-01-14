'use strict';

(function (angular) {

  var CommentCoreService = function (CommentResource) {

    this.getComments = function (type, referenceId) {
      return CommentResource.query({ type: type, referenceId: referenceId }).$promise;
    };

    this.createComment = function(type, referenceId, content) {
      return CommentResource.createComment({ type: type, referenceId: referenceId, content: content }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .service('CommentCoreService', CommentCoreService)
    .service('CommentResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/comments',
        {
          type: '@type',
          referenceId: '@referenceId'
        },
        {
          createComment: {
            method: 'POST',
            url: baseUri + '/comments/create',
          }
        }
      );
    });


})(angular);
