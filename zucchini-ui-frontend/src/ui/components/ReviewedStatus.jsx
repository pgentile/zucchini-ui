import { memo } from "react";
import PropTypes from "prop-types";
import Badge from "react-bootstrap/Badge";

function ReviewedStatus({ reviewed }) {
  return <Badge variant={reviewed ? "secondary" : "light"}>{reviewed ? "Oui" : "Non"}</Badge>;
}

ReviewedStatus.propTypes = {
  reviewed: PropTypes.bool.isRequired
};

export default memo(ReviewedStatus);
