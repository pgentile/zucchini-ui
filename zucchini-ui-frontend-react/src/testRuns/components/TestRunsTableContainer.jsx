import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunsTable from './TestRunsTable';


const selectTestRuns = createSelector(
  state => state.testRuns.testRuns,
  (state, ownProps) => ownProps.selectedType,
  (testRuns, selectedType) => {
    if (selectedType) {
      return testRuns.filter(testRun => testRun.type === selectedType);
    }
    return testRuns;
  },
);


const TestRunsTableContainer = connect(
  (state, ownProps) => ({
    testRuns: selectTestRuns(state, ownProps),
  }),
)(TestRunsTable);

export default TestRunsTableContainer;
