import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import PresenceIndicator from './PresenceIndicator';
import { watch, unwatch } from '../redux';


const selectOtherWatcherIds = createSelector(
  state => state.presence.otherWatcherIds,
  watcherIds => watcherIds,
);

const selectProps = createStructuredSelector({
  otherWatcherIds: selectOtherWatcherIds,
});


export default connect(
  selectProps,
  {
    onWatch: watch,
    onUnwatch: unwatch,
  }
)(PresenceIndicator);
