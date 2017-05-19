import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import compose from 'recompose/compose';

import { watch, unwatch } from '../redux';
import withWindowVisibility from '../../windowVisibility/components/withWindowVisibility';


const selectOtherWatcherIds = createSelector(
  state => state.presence.otherWatcherIds,
  watcherIds => watcherIds,
);

const selectProps = createStructuredSelector({
  otherWatcherIds: selectOtherWatcherIds,
});

const presenceConnect = connect(
  selectProps,
  {
    onWatch: watch,
    onUnwatch: unwatch,
  }
);


export default function withPresenceIndicator(WrappedComponent) {
  const wrapper = class extends React.Component { // eslint-disable-line react/display-name

    static propTypes = {
      windowVisibilityState: PropTypes.string.isRequired,
      referenceType: PropTypes.string.isRequired,
      reference: PropTypes.string.isRequired,
      otherWatcherIds: PropTypes.array,
      onWatch: PropTypes.func.isRequired,
      onUnwatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { onWatch, referenceType, reference, windowVisibilityState } = this.props;

      if (windowVisibilityState === 'VISIBLE') {
        onWatch({
          referenceType,
          reference,
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      const { onUnwatch } = this.props;
      const { onWatch, referenceType, reference, windowVisibilityState } = nextProps;

      if (this.hasVisibilityChanged(nextProps) || this.hasReferenceChanged(nextProps)) {
        onUnwatch();

        if (windowVisibilityState === 'VISIBLE') {
          onWatch({
            referenceType,
            reference,
          });
        }
      }

    }

    componentWillUnmount() {
      this.props.onUnwatch();
    }

    hasVisibilityChanged(nextProps) {
      return this.props.windowVisibilityState !== nextProps.windowVisibilityState;
    }

    hasReferenceChanged(nextProps) {
      return this.props.referenceType !== nextProps.referenceType || this.props.reference !== nextProps.reference;
    }

    render() {
      const { otherWatcherIds } = this.props;
      return (
        <WrappedComponent otherWatcherIds={otherWatcherIds} />
      );
    }

  };

  const displayName = wrapDisplayName(WrappedComponent, 'withPresenceIndicator');
  const wrapped = setDisplayName(displayName)(wrapper);

  return compose(presenceConnect, withWindowVisibility)(wrapped);
}
