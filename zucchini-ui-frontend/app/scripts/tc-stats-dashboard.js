'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcStatsDashboard', {
    template: require('../views/tc-stats-dashboard.html'),
    bindings: {
      stats: '<',
    },
    controller: function (statsDashboardState) {

      this.$onInit = function () {
        // Init state from stored state
        this.showDetails = statsDashboardState.get().showDetails;
      };

      this.hide = function () {
        this.updateState(false);
      }.bind(this);

      this.show = function () {
        this.updateState(true);
      }.bind(this);

      this.updateState = function (newState) {
        this.showDetails = newState;
        statsDashboardState.save({ showDetails: newState });
      };

    },
  })
  .factory('statsDashboardState', function (BrowserLocalStorage) {
    return BrowserLocalStorage.getItem('statsDashboardState', function () {
      return {
        showDetails: true,
      };
    });
  });
