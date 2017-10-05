import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { loadTestRunReportsPage } from '../redux';

import ReportsPage from './ReportsPage';

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

const ReportsPageContainer = connect(
  selectProps,
  {
    onLoad: loadTestRunReportsPage,
  },
)(ReportsPage);

export default ReportsPageContainer;
