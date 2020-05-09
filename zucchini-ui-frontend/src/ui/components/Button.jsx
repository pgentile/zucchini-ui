import PropTypes from "prop-types";
import React from "react";
import { default as BootstrapButton } from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Button extends React.PureComponent {
  static propTypes = {
    ...BootstrapButton.propTypes,
    glyph: PropTypes.string
  };

  render() {
    const { glyph, children, ...otherProps } = this.props;
    return (
      <BootstrapButton {...otherProps}>
        {glyph && <FontAwesomeIcon icon={glyph} />} {children}
      </BootstrapButton>
    );
  }
}
