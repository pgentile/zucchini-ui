import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import FeaturePage from "./FeaturePage";
import { loadFeaturePage } from "../redux";

const selectFeatureId = createSelector(
  (state, ownProps) => ownProps.match.params.featureId,
  featureId => featureId
);

const selectFeature = createSelector(
  state => state.feature.feature,
  feature => feature
);

const selectProps = createStructuredSelector({
  featureId: selectFeatureId,
  feature: selectFeature
});

const FeaturePageContainer = connect(selectProps, {
  onLoad: loadFeaturePage
})(FeaturePage);

export default FeaturePageContainer;
