import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default class ButtonLink extends React.PureComponent {
  static propTypes = {
    to: Link.propTypes.to,
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
