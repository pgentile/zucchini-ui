import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunDiffSelectorPage from './TestRunDiffSelectorPage';

import { loadTestRunDiffSelectorPage } from '../redux';


const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.params.testRunId,
  testRunId => testRunId,
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun,
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  testRun: selectTestRun,
});


export default connect(
  selectProps,
  {
    onLoad: loadTestRunDiffSelectorPage,
  },
)(TestRunDiffSelectorPage);
