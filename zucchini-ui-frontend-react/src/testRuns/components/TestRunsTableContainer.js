import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TestRunsTable from './TestRunsTable';
import { selectTestRuns } from '../selectors';


const selectProps = createStructuredSelector({
  testRuns: selectTestRuns,
})


const TestRunsTableContainer = connect(
  selectProps,
)(TestRunsTable);

export default TestRunsTableContainer;
