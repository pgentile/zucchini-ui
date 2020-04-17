import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

export default class Breadcrumb extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { items } = this.props;

    const isActive = (index) => index + 1 === items.length;

    const elements = items.map((item, index) => {
      // Active element
      if (isActive(index)) {
        return (
          <li key={index} className="active">
            {item.value}
          </li>
        );
      }

      // Inactive element
      return (
        <li key={index}>
          <Link to={item.link}>{item.value}</Link>
        </li>
      );
    });

    return <ol className="breadcrumb">{elements}</ol>;
  }
}
