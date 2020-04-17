import React from "react";
import wrapDisplayName from "recompose/wrapDisplayName";
import debounce from "lodash/debounce";

export default function withWindowVisibility(WrappedComponent) {
  return class extends React.Component {
    static displayName = wrapDisplayName(WrappedComponent, "withWindowVisibility");

    state = {
      isWindowVisible: true
    };

    componentDidMount() {
      window.document.addEventListener("visibilitychange", this.listenVisibilityChange);
    }

    componentWillUnmount() {
      this.applyHidden.cancel();

      window.document.removeEventListener("visibilitychange", this.listenVisibilityChange);
    }

    listenVisibilityChange = () => {
      this.isWindowVisible() ? this.applyVisible() : this.applyHidden();
    };

    applyVisible() {
      this.applyHidden.cancel();

      this.setState((prevState) => {
        if (prevState.isWindowVisible) {
          return null;
        }

        return {
          isWindowVisible: true
        };
      });
    }

    // These events are throttled because the full screen mode in chrome
    // triggers two events : hidden then visible.
    applyHidden = debounce(() => {
      this.setState((prevState) => {
        if (!prevState.isWindowVisible) {
          return null;
        }

        return {
          isWindowVisible: false
        };
      });
    }, 500);

    isWindowVisible() {
      return window.document.visibilityState !== "hidden";
    }

    render() {
      return <WrappedComponent {...this.props} isWindowVisible={this.state.isWindowVisible} />;
    }
  };
}
