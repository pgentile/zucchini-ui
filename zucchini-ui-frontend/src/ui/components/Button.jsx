import PropTypes from "prop-types";
import React from "react";
import { default as BootstrapButton } from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

export default class Button extends React.PureComponent {
  static propTypes = {
    ...BootstrapButton.propTypes,
    glyph: PropTypes.string
  };

  render() {
    const { glyph, children, ...otherProps } = this.props;

    let glyphElement = null;
    if (glyph) {
      glyphElement = <Glyphicon glyph={glyph} />;
    }

    return (
      <BootstrapButton {...otherProps}>
        {glyphElement} {children}
      </BootstrapButton>
    );
  }
}
