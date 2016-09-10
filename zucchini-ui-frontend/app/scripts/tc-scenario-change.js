'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcScenarioChange', {
    template: require('../views/tc-scenario-change.html'),
    bindings: {
      type: '<',
      value: '<',
    },
  });
