'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcGlyphicon', {
    template: require('../views/tc-glyphicon.html'),
    bindings: {
      name: '@',
    },
    controller: function () {

      this.classNames = {
        glyphicon: true,
      };

      this.$onChanges = function () {
        if (this.name) {
          var glyphiconClass = 'glyphicon-' + this.name;
          this.classNames[glyphiconClass] = true;
        }
      };

    }
  });
