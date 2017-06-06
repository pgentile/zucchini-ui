import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunsTable from './TestRunsTable';

import { selectLatestTestRuns } from '../selectors';


const selectTestRuns = createSelector(
  state => selectLatestTestRuns(state),
  (state, ownProps) => ownProps.selectedType,
  (testRuns, selectedType) => {
    if (selectedType) {
      return testRuns.filter(testRun => testRun.type === selectedType);
    }
    return testRuns;
  },
);


const selectProps = createStructuredSelector({
  testRuns: selectTestRuns,
});


const TestRunsTableContainer = connect(
  selectProps,
)(TestRunsTable);

export default TestRunsTableContainer;
