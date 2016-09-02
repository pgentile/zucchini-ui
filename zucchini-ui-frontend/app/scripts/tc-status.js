'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcStatus', {
    template: require('../views/tc-status.html'),
    bindings: {
      status: '<'
    }
  });
