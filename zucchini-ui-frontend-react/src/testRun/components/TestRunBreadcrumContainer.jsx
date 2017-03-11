import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunBreadcrum from './TestRunBreadcrum';



const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun,
);

const TestRunBreadcrumContainer = connect(
  state => ({
    testRun: selectTestRun(state),
  }),
)(TestRunBreadcrum);

export default TestRunBreadcrumContainer;
