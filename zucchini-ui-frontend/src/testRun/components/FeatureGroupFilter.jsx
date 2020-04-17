import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import ListWithSeparator from "../../ui/components/ListWithSeparator";

export default class FeatureGroupFilter extends React.PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    featureGroups: PropTypes.array.isRequired
  };

  render() {
    const { testRunId, featureGroups } = this.props;

    const featureGroupLinks = featureGroups.map((featureGroup) => {
      return (
        <span key={featureGroup}>
          <Link to={{ pathname: `/test-runs/${testRunId}`, search: queryString.stringify({ featureGroup }) }}>
            {featureGroup}
          </Link>
        </span>
      );
    });

    return (
      <p>
        Filter par groupe :{" "}
        <ListWithSeparator separator=", ">
          <Link to={`/test-runs/${testRunId}`}>
            <i>Tous</i>
          </Link>
          {featureGroupLinks}
        </ListWithSeparator>
      </p>
    );
  }
}
