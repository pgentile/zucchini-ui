import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import PurgeDialog from './PurgeDialog';
import { purgeThenReload } from '../redux';
import { selectTestRunTypes } from '../selectors';


export const selectTestRuns = createSelector(
  state => state.testRuns.testRuns,
  testRuns => testRuns,
);


const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes,
  testRuns: selectTestRuns,
});

const PurgeDialogContainer = connect(
  selectProps,
  {
    onPurge: purgeThenReload,
  },
)(PurgeDialog);

export default PurgeDialogContainer;
