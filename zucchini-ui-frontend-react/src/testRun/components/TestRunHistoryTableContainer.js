import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunHistoryTable from './TestRunHistoryTable';
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

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  testRunType: selectTestRunType,
  history: selectHistory,
})


const TestRunHistoryTableContainer = connect(
  selectProps,
  {
    onLoad: getTestRunHistoryByType,
  },
)(TestRunHistoryTable);

export default TestRunHistoryTableContainer;
