import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunsPage from '../components/TestRunsPage';
import { getLatestTestRuns } from '../redux';


const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => testRun.type));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);


const TestRunsPageContainer = connect(
  state => ({
    testRunTypes: selectTestRunTypes(state),
  }),
  {
    onLoad: getLatestTestRuns,
  }
)(TestRunsPage);

export default TestRunsPageContainer;
