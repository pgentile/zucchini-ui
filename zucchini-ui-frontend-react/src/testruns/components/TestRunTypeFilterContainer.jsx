import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunTypeFilter from '../components/TestRunTypeFilter';


const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => testRun.type));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);


const TestRunTypeFilterContainer = connect(
  state => ({
    testRunTypes: selectTestRunTypes(state),
  }),
)(TestRunTypeFilter);

export default TestRunTypeFilterContainer;
