import React from 'react';
import PropTypes from 'prop-types';

import EventScheduler from '../EventScheduler';
import LoadingBar from './LoadingBar';


export default class LoadingIndicator extends React.PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.eventScheduler = new EventScheduler();

    this.state = {
      start: false,
      pending: false,
      ending: false,
      done: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;

    if (active) {
      this.scheduleState({ start: true });
      this.scheduleState({ pending: true });
    } else {
      this.scheduleState({ ending: true });
      this.scheduleState({ done: true }, 200);
      this.scheduleState({ start: false, pending: false, ending: false, done: false }, 100);
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
