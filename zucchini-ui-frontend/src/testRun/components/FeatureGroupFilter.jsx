import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";

import ListWithSeparator from "../../ui/components/ListWithSeparator";

export default memo(function FeatureGroupFilter() {
  const testRunId = useSelector((state) => state.testRun.testRun.id);
  const features = useSelector((state) => state.testRun.features);

  const featureGroups = useMemo(() => {
    const groupSet = new Set(features.map((feature) => feature.group).filter((group) => Boolean(group)));
    return Array.from(groupSet).sort();
  }, [features]);

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
    <p className="mb-2">
      Filter par groupe :{" "}
      <ListWithSeparator separator=", ">
        <Link to={`/test-runs/${testRunId}`}>
          <i>Tous</i>
        </Link>
        {featureGroupLinks}
      </ListWithSeparator>
    </p>
  );
});
