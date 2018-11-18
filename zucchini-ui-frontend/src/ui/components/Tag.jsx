import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";

export default class Tag extends React.PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
  };

  render() {
    const { testRunId, tag } = this.props;

    const tagLink = {
      pathname: `/test-runs/${testRunId}/tag-details`,
      query: queryString.stringify({ tag })
    };

    return (
      <Link className="label label-info" to={tagLink}>
        @{tag}
      </Link>
    );
  }
}
