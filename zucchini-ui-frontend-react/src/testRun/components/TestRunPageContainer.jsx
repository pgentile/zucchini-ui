import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunPage from './TestRunPage';

import { getTestRun } from '../redux';


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
})


const TestRunPageContainer = connect(
  selectProps,
  {
    onLoad: getTestRun,
  },
)(TestRunPage);

export default TestRunPageContainer;
