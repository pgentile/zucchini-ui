import React from 'react';
import PropTypes from 'prop-types';


export default class LoadingBar extends React.PureComponent {

  static propTypes = {
    start: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    ending: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
  };

  render() {
    let classNames = 'loading-bar';
    ['start', 'pending', 'ending', 'done'].forEach(flagName => {
      if (this.props[flagName]) {
        classNames += ` loading-bar-${flagName}`;
      }
    });

    return (
      <div className={classNames}></div>
    );
  }

}
