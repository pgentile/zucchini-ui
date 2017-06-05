import React from 'react';
import PropTypes from 'prop-types';

import EventScheduler from '../EventScheduler';


export default class LoadingIndicator extends React.PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.eventScheduler = new EventScheduler();

    this.state = {
      classNames: ['loading-bar'],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;

    if (active) {
      this.eventScheduler.schedule(() => {
        this.updateClassNames({ add: ['loading-bar-start'] });
      });
      this.eventScheduler.schedule(() => {
        this.updateClassNames({ add: ['loading-bar-pending'] });
      });
    } else {
      this.eventScheduler.schedule(() => {
        this.updateClassNames({ add: ['loading-bar-ending'] });
      });
      this.eventScheduler.schedule(() => {
        this.updateClassNames({ add: ['loading-bar-done'] });
      }, 200);
      this.eventScheduler.schedule(() => {
        this.updateClassNames({ remove: ['loading-bar-start', 'loading-bar-pending', 'loading-bar-ending', 'loading-bar-done'] });
      }, 100);
    }
  }

  updateClassNames({ add, remove }) {
    this.setState(prevState => {
      const classNamesSet = new Set(prevState.classNames);

      if (add) {
        add.forEach(className => classNamesSet.add(className));
      }
      if (remove) {
        remove.forEach(className => classNamesSet.delete(className));
      }

      return {
        classNames: Array.from(classNamesSet),
      };
    });

  }

  addClassNames(...classNames) {
    this.setState(prevState => {
      const classNamesSet = new Set(prevState.classNames);
      classNames.forEach(className => classNamesSet.add(className));

      return {
        classNames: Array.from(classNamesSet),
      };
    });
  }

  render() {
    const className = Array.from(this.state.classNames).join(' ');

    return (
      <div className={className}></div>
    );
  }

}
