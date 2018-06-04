import React from 'react';
import PropTypes from 'prop-types';

import EventScheduler from '../EventScheduler';
import LoadingBar from './LoadingBar';


export default class LoadingIndicator extends React.PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    active: false,
  };

  inactiveState = {
    start: false,
    pending: false,
    ending: false,
    done: false,
  };

  state = this.inactiveState;

  eventScheduler = new EventScheduler();

  componentDidUpdate(prevProps) {
    const { active } = this.props;

    if (prevProps.active !== active) {
      if (active) {
        this.scheduleState({ start: true });
        this.scheduleState({ pending: true });
      } else {
        this.scheduleState({ ending: true });
        this.scheduleState({ done: true }, 200);
        this.scheduleState(this.inactiveState, 100);
      }
    }
  }

  scheduleState(nextState, timeout) {
    this.eventScheduler.schedule(() => {
      this.setState(nextState);
    }, timeout);
  }

  render() {
    return (
      <LoadingBar {...this.state} />
    );
  }

}
