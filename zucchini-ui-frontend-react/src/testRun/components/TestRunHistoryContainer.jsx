import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunHistory from './TestRunHistory';
import { getTestRunHistoryByType } from '../redux';


const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.testRunId,
  testRunId => testRunId,
);

const selectTestRunType = createSelector(
  state => state.testRun.testRun.type,
  testRunType => testRunType || null,
);

const selectHistory = createSelector(
  state => state.testRun.history,
  history => history,
);


const TestRunHistoryContainer = connect(
  (state, ownProps) => ({
    testRunId: selectTestRunId(state, ownProps),
    testRunType: selectTestRunType(state),
    history: selectHistory(state),
  }),
  {
    onLoad: getTestRunHistoryByType,
  },
)(TestRunHistory);

export default TestRunHistoryContainer;
