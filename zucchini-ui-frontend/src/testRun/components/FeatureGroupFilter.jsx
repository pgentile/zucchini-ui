import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";

import ListWithSeparator from "../../ui/components/ListWithSeparator";
import useQueryParams from "../../useQueryParams";

function FeatureGroupFilter() {
  const features = useSelector((state) => state.testRun.features);

  const queryParams = useQueryParams();

  const featureGroups = useMemo(() => {
    const groupSet = new Set(features.map((feature) => feature.group).filter((group) => Boolean(group)));
    return Array.from(groupSet).sort();
  }, [features]);

  const featureGroupLinks = featureGroups.map((featureGroup) => {
    const linkSearch = queryString.stringify({
      ...queryParams,
      featureGroup
    });

    return (
      <span key={featureGroup}>
        <Link to={{ search: linkSearch }} preventScrollReset>
          {featureGroup}
        </Link>
      </span>
    );
  });

  const linkAllSearch = queryString.stringify({
    ...queryParams,
    featureGroup: undefined
  });

  return (
    <p className="mb-2">
      Filter par groupe :{" "}
      <ListWithSeparator separator=", ">
        <Link to={{ search: linkAllSearch }} preventScrollReset>
          <i>Tous</i>
        </Link>
        {featureGroupLinks}
      </ListWithSeparator>
    </p>
  );
}

export default memo(FeatureGroupFilter);
