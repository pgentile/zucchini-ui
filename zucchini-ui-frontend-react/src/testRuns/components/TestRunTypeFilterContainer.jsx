import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunTypeFilter from './TestRunTypeFilter';


const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => testRun.type));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes,
})


const TestRunTypeFilterContainer = connect(
  selectProps,
)(TestRunTypeFilter);

export default TestRunTypeFilterContainer;
