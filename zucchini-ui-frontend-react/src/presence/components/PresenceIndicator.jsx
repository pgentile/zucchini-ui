import React from 'react';
import PropTypes from 'prop-types';

import withWindowVisibility from '../../windowVisibility/components/withWindowVisibility';


export default withWindowVisibility(class PresenceIndicator extends React.PureComponent {

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
    return null;
  }

});
