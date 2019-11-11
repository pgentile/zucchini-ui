import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import wrapDisplayName from "recompose/wrapDisplayName";

import { watch, unwatch } from "../redux";
import withWindowVisibility from "../../windowVisibility/components/withWindowVisibility";

const selectOtherWatcherIds = createSelector(
  state => state.presence.otherWatcherIds,
  watcherIds => watcherIds
);

const selectProps = createStructuredSelector({
  otherWatcherIds: selectOtherWatcherIds
});

const presenceConnect = connect(selectProps, {
  onWatch: watch,
  onUnwatch: unwatch
});

export default function withPresenceIndicator(WrappedComponent) {
  const wrapper = class extends React.Component {
    static displayName = wrapDisplayName(WrappedComponent, "withPresenceIndicator");

    static propTypes = {
      isWindowVisible: PropTypes.bool.isRequired,
      referenceType: PropTypes.string.isRequired,
      reference: PropTypes.string.isRequired,
      otherWatcherIds: PropTypes.array,
      onWatch: PropTypes.func.isRequired,
      onUnwatch: PropTypes.func.isRequired
    };

    componentDidMount() {
      const { onWatch, referenceType, reference, isWindowVisible } = this.props;

      if (isWindowVisible) {
        onWatch({
          referenceType,
          reference
        });
      }
    }

    componentDidUpdate(prevProps) {
      const { onUnwatch, onWatch, referenceType, reference, isWindowVisible } = this.props;

      if (this.hasVisibilityChanged(prevProps) || this.hasReferenceChanged(prevProps)) {
        onUnwatch();

        if (isWindowVisible) {
          onWatch({
            referenceType,
            reference
          });
        }
      }
    }

    componentWillUnmount() {
      this.props.onUnwatch();
    }

    hasVisibilityChanged(prevProps) {
      return this.props.isWindowVisible !== prevProps.isWindowVisible;
    }

    hasReferenceChanged(prevProps) {
      return this.props.referenceType !== prevProps.referenceType || this.props.reference !== prevProps.reference;
    }

    render() {
      const { otherWatcherIds } = this.props;
      return <WrappedComponent otherWatcherIds={otherWatcherIds} />;
    }
  };

  return withWindowVisibility(presenceConnect(wrapper));
}
