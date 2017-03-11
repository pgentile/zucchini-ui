import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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


const TestRunPageContainer = connect(
  (state, ownProps) => ({
    testRunId: selectTestRunId(state, ownProps),
    testRun: selectTestRun(state),
  }),
  {
    onLoad: getTestRun,
  },
)(TestRunPage);

export default TestRunPageContainer;
