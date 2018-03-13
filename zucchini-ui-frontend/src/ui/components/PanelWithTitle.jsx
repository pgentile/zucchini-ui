import PropTypes from 'prop-types';
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';


export default class PanelWithTitle extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    panelBody: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    panelBody: false,
  };

  render() {
    const { title, panelBody, children, ...otherProps } = this.props;

    let currentChildren = children;
    if (panelBody) {
      currentChildren = (
        <Panel.Body>
          {currentChildren}
        </Panel.Body>
      );
    }

    return (
      <Panel {...otherProps}>
        <Panel.Heading>
          <Panel.Title componentClass="h6">
            {title}
          </Panel.Title>
        </Panel.Heading>
        {currentChildren}
      </Panel>
    );
  }

}
