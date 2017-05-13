import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeatureTable from '../../ui/components/FeatureTable';


const selectFeatures = createSelector(
  state => state.tagDetails.features,
  state => state.featureFilters,
  (features, featureFilters) => {
    const filters = createFeatureFilters(featureFilters);

    if (filters) {
      let filteredFeatures = features;
      filters.forEach(filter => {
        filteredFeatures = filteredFeatures.filter(filter);
      })
      return filteredFeatures;
    }

    return features;
  },
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


const selectProps = createStructuredSelector({
  features: selectFeatures,
})


export default connect(
  selectProps,
)(FeatureTable);
