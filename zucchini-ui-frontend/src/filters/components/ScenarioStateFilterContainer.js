import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioStateFilter from "./ScenarioStateFilter";
import { updateScenarioFilters } from "../../filters/redux";

const selectFilters = createSelector(
  state => state.scenarioFilters,
  scenarioFilters => scenarioFilters
);

const selectProps = createStructuredSelector({
  filters: selectFilters
});

export default connect(selectProps, {
  onFilterChange: updateScenarioFilters
})(ScenarioStateFilter);
