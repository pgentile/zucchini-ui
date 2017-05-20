import React from 'react';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';


export const VISIBLE_STATE = 'VISIBLE';
export const HIDDEN_STATE = 'HIDDEN';
export const UNKNOWN_STATE = 'UNKNOWN';


export default function withWindowVisibility(WrappedComponent) {
  const wrapper = class extends React.Component { // eslint-disable-line react/display-name

    constructor(props) {
      super(props);

      this.state = {
        windowVisibilityState: UNKNOWN_STATE,
      };
    }

    componentDidMount() {
      this.setState({
        windowVisibilityState: this.getVisibilityState(),
      });

      window.document.addEventListener('visibilitychange', this.listenVisibilityChange);
    }

    componentWillUnmount() {
      this.setState({
        windowVisibilityState: UNKNOWN_STATE,
      });

      window.document.removeEventListener('visibilitychange', this.listenVisibilityChange);
    }

    listenVisibilityChange = () => {
      this.setState({
        windowVisibilityState: this.getVisibilityState(),
      });
    };

    getVisibilityState() {
      return window.document.visibilityState === 'visible' ? VISIBLE_STATE : HIDDEN_STATE;
    }

    render() {
      return (
        <WrappedComponent {...this.props} windowVisibilityState={this.state.windowVisibilityState} />
      );
    }

  };

  const displayName = wrapDisplayName(WrappedComponent, 'withWindowVisibility');
  return setDisplayName(displayName)(wrapper);
}
