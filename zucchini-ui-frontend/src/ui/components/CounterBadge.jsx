import PropTypes from "prop-types";
import React, { memo } from "react";
import Badge from "react-bootstrap/Badge";

function CounterBadge({ children, variant }) {
  return (
    <Badge pill variant={variant ?? "dark"}>
      {children ?? "-"}
    </Badge>
  );
}

CounterBadge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string
};

export default memo(CounterBadge);
