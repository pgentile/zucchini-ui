import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TestRunsTable from './TestRunsTable';

import { selectLatestTestRuns } from '../selectors';


const selectProps = createStructuredSelector({
  testRuns: selectLatestTestRuns,
});


const TestRunsTableContainer = connect(
  selectProps,
)(TestRunsTable);

export default TestRunsTableContainer;
