import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import LoadingIndicator from './LoadingIndicator';


const selectActive = createSelector(
  state => state.loadingIndicator.counter,
  counter => (counter > 0),
);

const selectProps = createStructuredSelector({
  active: selectActive,
});


export default connect(
  selectProps,
)(LoadingIndicator);
