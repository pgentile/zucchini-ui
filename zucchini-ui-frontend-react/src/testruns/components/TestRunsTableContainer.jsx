import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunsTable from '../components/TestRunsTable';


const selectTestRuns = createSelector(
  state => state.testRuns.testRuns,
  state => state.testRuns.selectedType,
  (testRuns, selectedType) => {
    if (selectedType) {
      return testRuns.filter(testRun => testRun.type === selectedType);
    }
    return testRuns;
  },
);


const TestRunsTableContainer = connect(
  state => ({
    testRuns: selectTestRuns(state),
  }),
)(TestRunsTable);

export default TestRunsTableContainer;
