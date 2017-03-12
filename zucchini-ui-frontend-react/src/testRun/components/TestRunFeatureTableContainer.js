import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunFeatureTable from './TestRunFeatureTable';
import { getFeatures } from '../redux';


const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.testRunId,
  testRunId => testRunId,
);

const selectFeatures = createSelector(
  state => state.testRun.features,
  (state, ownProps) => ownProps.selectedFeatureGroup,
  state => state.featureFilters,
  (features, selectedFeatureGroup, featureFilters) => {
    const filters = createFeatureFilters(selectedFeatureGroup, featureFilters);

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

function createFeatureFilters(selectedFeatureGroup, featureFilters) {
  let filters = [];

  if (selectedFeatureGroup) {
    const filter = feature => feature.group === selectedFeatureGroup;
    filters = [...filters, filter];
  }

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
  testRunId: selectTestRunId,
  features: selectFeatures,
})


const TestRunFeatureTableContainer = connect(
  selectProps,
  {
    onLoad: getFeatures,
  },
)(TestRunFeatureTable);

export default TestRunFeatureTableContainer;
