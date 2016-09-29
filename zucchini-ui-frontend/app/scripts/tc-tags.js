'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcTags', {
    template: require('../views/tc-tags.html'),
    bindings: {
      tags: '<',
      testRunId: '<',
    },
  });
