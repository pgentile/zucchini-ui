import PropTypes from "prop-types";
import React from "react";

export default function ListWithSeparator({ children, separator }) {
  let items = React.Children.map(children, child => [child, separator]);

  if (items.length > 0) {
    const begining = items.slice(0, items.length - 1);

    // Remove last separator
    let last = items[items.length - 1];
    last = last.slice(0, 0);

    items = [...begining, last];
  }

  return <span>{items}</span>;
}

ListWithSeparator.propTypes = {
  separator: PropTypes.string.isRequired,
  children: PropTypes.node
};
