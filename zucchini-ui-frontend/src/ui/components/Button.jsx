import PropTypes from "prop-types";
import React from "react";
import { default as BootstrapButton } from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ icon, children, ...otherProps }) {
  return (
    <BootstrapButton {...otherProps}>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {children}
    </BootstrapButton>
  );
}

Button.propTypes = {
  ...BootstrapButton.propTypes,
  icon: PropTypes.object
};
