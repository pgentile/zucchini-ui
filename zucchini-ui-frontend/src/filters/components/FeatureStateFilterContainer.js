import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import FeatureStateFilter from "./FeatureStateFilter";
import { updateFeatureFilters } from "../../filters/redux";

const selectFilters = createSelector(
  state => state.featureFilters,
  featureFilters => featureFilters
);

const selectProps = createStructuredSelector({
  filters: selectFilters
});

export default connect(selectProps, {
  onFilterChange: updateFeatureFilters
})(FeatureStateFilter);
