import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import StepFilters from "./StepFilters";
import { updateStepFilters } from "../../filters/redux";

const selectFilters = createSelector(
  state => state.stepFilters,
  filters => filters
);

const selectProps = createStructuredSelector({
  filters: selectFilters
});

const StepFiltersContainer = connect(selectProps, {
  onFilterChange: updateStepFilters
})(StepFilters);

export default StepFiltersContainer;
