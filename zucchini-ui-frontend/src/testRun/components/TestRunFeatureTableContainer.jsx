import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectFeatureFilterFunc } from "../../filters/selectors";
import FeatureTable from "../../ui/components/FeatureTable";

function TestRunFeatureTableContainer() {
  const features = useSelector((state) => state.testRun.features);
  const { featureGroup } = useParams();
  const featureFilterFunc = useSelector(selectFeatureFilterFunc);

  let filteredFeatures = features;
  filteredFeatures = filteredFeatures.filter(featureFilterFunc);

  if (featureGroup) {
    filteredFeatures = filteredFeatures.filter((feature) => feature.group === featureGroup);
  }

  return <FeatureTable features={filteredFeatures} />;
}

export default memo(TestRunFeatureTableContainer);
