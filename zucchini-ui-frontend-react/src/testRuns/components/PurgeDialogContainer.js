import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PurgeDialog from './PurgeDialog';
import { purgeThenReload } from '../redux';
import { selectTestRunTypes, selectTestRuns } from '../selectors';


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
