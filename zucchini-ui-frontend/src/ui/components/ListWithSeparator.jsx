import PropTypes from "prop-types";
import { Fragment, Children, memo } from "react";

function ListWithSeparator({ children, separator }) {
  return Children.toArray(children)
    .flatMap((child, index) => [
      <Fragment key={`child-${index}`}>{child}</Fragment>,
      <Fragment key={`separator-${index}`}>{separator}</Fragment>
    ])
    .slice(0, -1);
}

ListWithSeparator.propTypes = {
  separator: PropTypes.node.isRequired,
  children: PropTypes.node
};

export default memo(ListWithSeparator);
