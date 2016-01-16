'use strict';

(function (angular) {

  var CommentCoreService = function (CommentResource) {

    this.getComments = function (referenceType, reference) {
      return CommentResource.query({ referenceType: referenceType, reference: reference }).$promise;
    };

    this.createComment = function(references, content) {
      return CommentResource.createComment({ references: references, content: content }).$promise;
    };

  };


  angular.module('testsCucumberApp')
    .service('CommentCoreService', CommentCoreService)
    .service('CommentResource', function ($resource, baseUri) {
      return $resource(
        baseUri + '/comments',
        {
          referenceType: '@referenceType',
          reference: '@reference'
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
