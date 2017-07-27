import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';

import FailuresTable from './FailuresTable';

const selectFailures = createSelector(
  state => state.failures,
  failures => failures,
);


const selectProps = createStructuredSelector({
  failures: selectFailures
});


const FailuresTableContainer = connect(
  selectProps,
)(FailuresTable);

export default FailuresTableContainer;
