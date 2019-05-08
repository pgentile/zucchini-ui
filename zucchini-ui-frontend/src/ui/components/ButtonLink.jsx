import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";

export default class ButtonLink extends React.PureComponent {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    ...Button.propTypes
  };

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <Button componentClass={Link} {...otherProps}>
        {children}
      </Button>
    );
  }
}
