import React from 'react';
import { Link } from 'react-router';


export default class Breadcrumb extends React.PureComponent {

  render() {
    const { items } = this.props;

    const isActive = (index) => index + 1 === items.length;

    const elements = items.map((item, index) => {
      // Active element
      if (isActive(index)) {
        return (
          <li key={index} className="active">{item.value}</li>
        );
      }

      // Inactive element
      return (
        <li key={index}><Link to={item.link}>{item.value}</Link></li>
      );
    });

    return (
      <ol className="breadcrumb">
        {elements}
      </ol>
    );
  }

}

Breadcrumb.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
