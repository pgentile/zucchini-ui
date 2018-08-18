import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

export default class Tag extends React.PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
  };

  render() {
    const { testRunId, tag } = this.props;

    const tagLink = {
      pathname: `/test-runs/${testRunId}/tag-details`,
      query: {
        tag
      }
    };

    return (
      <Link className="label label-info" to={tagLink}>
        @{tag}
      </Link>
    );
  }
}
