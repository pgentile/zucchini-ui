import { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Badge from "react-bootstrap/Badge";

export default class Tag extends PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
  };

  render() {
    const { testRunId, tag } = this.props;

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
}
