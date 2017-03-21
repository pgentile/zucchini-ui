import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';


export default class PanelWithTitle extends React.PureComponent {

  render() {
    const { title, children, ...otherProps } = this.props;

    const header = (
      <h6>{title}</h6>
    );

    return (
      <Panel header={header} {...otherProps}>
        {children}
      </Panel>
    );
  }

}

PanelWithTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

