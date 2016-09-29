'use strict';

var zucchiniModule = require('./module');


zucchiniModule
  .component('tcFeatureList', {
    template: require('../views/tc-feature-list.html'),
    bindings: {
      features: '<',
    },
    controller: function (featureStoredFilters) {

      this.selectedFeatures = [];

      this.$onInit = function () {
        // Init filters
        this.filters = featureStoredFilters.get();
      };

      this.$onChanges = function () {
        // Init selected features to bound features
        if (this.features) {
          this.updateFeatureSelection();
        }
      };

      this.updateFeatureSelection = function () {
        this.selectedFeatures = _.filter(this.features, this.isFeatureDisplayable);
      };

      this.onFilterChange = function () {
        featureStoredFilters.save(this.filters);
        this.updateFeatureSelection();
      };

      this.isFeatureDisplayable = function (feature) {
        return this.isFeatureStatusDisplayable(feature) && this.isFeatureReviewedStateDisplayable(feature);
      }.bind(this);

      this.isFeatureStatusDisplayable = function (feature) {
        switch (feature.status) {
        case 'PASSED':
          return this.filters.passed;
        case 'FAILED':
          return this.filters.failed;
        case 'PARTIAL':
          return this.filters.partial;
        case 'NOT_RUN':
          return this.filters.notRun;
        default:
          return true;
        }
      };

      this.isFeatureReviewedStateDisplayable = function (feature) {
        var selected = false;
        if (this.filters.reviewed) {
          selected = selected || (feature.stats.reviewed.count === feature.stats.all.count);
        }
        if (this.filters.notReviewed) {
          selected = selected || (feature.stats.reviewed.count !== feature.stats.all.count);
        }
        return selected;
      };

    },
  })
  .factory('featureStoredFilters', function (BrowserSessionStorage) {
    return BrowserSessionStorage.getItem('featureFilters', function () {
      return {
        passed: true,
        failed: true,
        partial: true,
        notRun: true,
        reviewed: true,
        notReviewed: true,
      };
    });
  });
