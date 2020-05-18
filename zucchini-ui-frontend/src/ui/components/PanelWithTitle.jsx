import PropTypes from "prop-types";
import React from "react";
import Card from "react-bootstrap/Card";

export default class PanelWithTitle extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    panelBody: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    panelBody: false
  };

  render() {
    const { title, panelBody, children, ...otherProps } = this.props;

    let currentChildren = children;
    if (panelBody) {
      currentChildren = <Card.Body>{currentChildren}</Card.Body>;
    }

    return (
      <Card {...otherProps}>
        <Card.Header>
          <Card.Title as="h6" className="mb-0">
            {title}
          </Card.Title>
        </Card.Header>
        {currentChildren}
      </Card>
    );
  }
}
