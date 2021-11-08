import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Badge from "react-bootstrap/Badge";

export default function Tag({ testRunId, tag }) {
  const tagLink = {
    pathname: `/test-runs/${testRunId}/tag-details`,
    search: queryString.stringify({ tag })
  };

  return (
    <Badge variant="info" as={Link} to={tagLink}>
      @{tag}
    </Badge>
  );
}

Tag.propTypes = {
  testRunId: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired
};
