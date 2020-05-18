import PropTypes from "prop-types";
import React from "react";
import { default as BootstrapButton } from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Button extends React.PureComponent {
  static propTypes = {
    ...BootstrapButton.propTypes,
    icon: PropTypes.string
  };

  render() {
    const { icon, children, ...otherProps } = this.props;
    return (
      <BootstrapButton {...otherProps}>
        {icon && <FontAwesomeIcon icon={icon} />} {children}
      </BootstrapButton>
    );
  }
}
