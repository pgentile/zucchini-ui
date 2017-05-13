import { createSelector } from 'reselect';


export const selectFeatureFilterFunc = createSelector(
  state => state.featureFilters,
  featureFilters => {
    const filters = createFeatureFilters(featureFilters);

    if (filters.length) {
      return feature => {
        let result = true;

        filters.forEach(filter => {
          if (result) {
            result = filter(feature);
          }
        });

        return result;
      };
    }

    // Accept all features
    return () => true;
  }
);


function createFeatureFilters(featureFilters) {
  let filters = [];

  if (!featureFilters.passed) {
    const filter = feature => feature.status !== 'PASSED';
    filters = [...filters, filter];
  }

  if (!featureFilters.failed) {
    const filter = feature => feature.status !== 'FAILED';
    filters = [...filters, filter];
  }

  if (!featureFilters.partial) {
    const filter = feature => feature.status !== 'PARTIAL';
    filters = [...filters, filter];
  }

  if (!featureFilters.notRun) {
    const filter = feature => feature.status !== 'NOT_RUN';
    filters = [...filters, filter];
  }

  if (!featureFilters.reviewed) {
    const filter = feature => (feature.stats.nonReviewed.count > 0);
    filters = [...filters, filter];
  }

  if (!featureFilters.notReviewed) {
    const filter = feature => (feature.stats.nonReviewed.count === 0);
    filters = [...filters, filter];
  }

  return filters;
}
