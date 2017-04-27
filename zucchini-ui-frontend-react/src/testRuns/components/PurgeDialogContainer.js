import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import PurgeDialog from './PurgeDialog';

const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => testRun.type));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);

const selectTestRuns = createSelector(
  state => state.testRuns.testRuns,
  testRuns => testRuns,
);

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes,
  testRuns: selectTestRuns,
});

const PurgeDialogContainer = connect(
  selectProps,
)(PurgeDialog);

export default PurgeDialogContainer;
