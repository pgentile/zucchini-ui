import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { selectFeatureFilterFunc } from "../../filters/selectors";
import FeatureTable from "../../ui/components/FeatureTable";

const selectFeatures = createSelector(
  (state) => state.tagDetails.features,
  selectFeatureFilterFunc,
  (features, featureFilterFunc) => {
    let filteredFeatures = features;
    filteredFeatures = filteredFeatures.filter(featureFilterFunc);
    return filteredFeatures;
  }
);

export default function TagDetailsFeatureTableContainer() {
  const features = useSelector(selectFeatures);
  return <FeatureTable features={features} />;
}
