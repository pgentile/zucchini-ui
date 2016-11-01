'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcStep', {
    template: require('../views/tc-step.html'),
    bindings: {
      scenario: '<',
      step: '<',
      filters: '<',
      special: '@',
    },
    controller: function (UrlBuilder) {
      var ctrl = this;

      this.buildUrlForAttachment = function (attachmentId) {
        return UrlBuilder.createApiUrl('/scenarii/' + ctrl.scenario.id + '/attachments/' + attachmentId);
      };

    },
  });
