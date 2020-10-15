import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";

import ListWithSeparator from "../../ui/components/ListWithSeparator";

function FeatureGroupFilter() {
  const features = useSelector((state) => state.testRun.features);

  const featureGroups = useMemo(() => {
    const groupSet = new Set(features.map((feature) => feature.group).filter((group) => Boolean(group)));
    return Array.from(groupSet).sort();
  }, [features]);

  const featureGroupLinks = featureGroups.map((featureGroup) => {
    return (
      <span key={featureGroup}>
        <Link to={(location) => buildLocation(location, featureGroup)}>{featureGroup}</Link>
      </span>
    );
  });

  return (
    <p className="mb-2">
      Filter par groupe :{" "}
      <ListWithSeparator separator=", ">
        <Link to={(location) => buildLocation(location)}>
          <i>Tous</i>
        </Link>
        {featureGroupLinks}
      </ListWithSeparator>
    </p>
  );
}

export default memo(FeatureGroupFilter);

function buildLocation(location, featureGroup) {
  const queryParams = queryString.parse(location.search);
  if (featureGroup) {
    queryParams.featureGroup = featureGroup;
  } else {
    delete queryParams.featureGroup;
  }

  return {
    ...location,
    search: queryString.stringify(queryParams),
    state: {
      scrollToTop: false
    }
  };
}
