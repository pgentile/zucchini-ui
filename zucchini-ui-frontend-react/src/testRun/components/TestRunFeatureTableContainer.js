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
  features => features,
);

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
