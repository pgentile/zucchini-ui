import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { selectFeatureFilterFunc } from "../../filters/selectors";
import FeatureTable from "../../ui/components/FeatureTable";

const selectFeatures = createSelector(
  (state) => state.testRun.features,
  (state, ownProps) => ownProps.selectedFeatureGroup,
  selectFeatureFilterFunc,
  (features, selectedFeatureGroup, featureFilterFunc) => {
    let filteredFeatures = features;
    filteredFeatures = filteredFeatures.filter(featureFilterFunc);

    if (selectedFeatureGroup) {
      filteredFeatures = filteredFeatures.filter((feature) => feature.group === selectedFeatureGroup);
    }

    return filteredFeatures;
  }
);

const selectProps = createStructuredSelector({
  features: selectFeatures
});

const TestRunFeatureTableContainer = connect(selectProps)(FeatureTable);

export default TestRunFeatureTableContainer;
