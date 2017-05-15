import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

import TestRunPage from './TestRunPage';

import { loadTestRunPage } from '../redux';


const selectSelectedFeatureGroup = createSelector(
  (state, ownProps) => ownProps.location.query.featureGroup || null,
  selectedFeatureGroup => selectedFeatureGroup,
);

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.params.testRunId,
  testRunId => testRunId,
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun,
);

const selectProps = createStructuredSelector({
  selectedFeatureGroup: selectSelectedFeatureGroup,
  testRunId: selectTestRunId,
  testRun: selectTestRun,
});

function goToTags({testRunId}) {
  return push(`/test-runs/${testRunId}/tags`);
}

function goToDiff({testRunId}) {
  return push(`/test-runs/${testRunId}/diff`);
}


const TestRunPageContainer = connect(
  selectProps,
  {
    onLoad: loadTestRunPage,
    onGoToTags: goToTags,
    onGoToDiff: goToDiff,
  },
)(TestRunPage);

export default TestRunPageContainer;
