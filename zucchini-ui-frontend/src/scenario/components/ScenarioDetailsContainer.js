import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioDetails from "./ScenarioDetails";
import { updateStepFilters } from "../../filters/redux";

const selectScenario = createSelector(
  state => state.scenario.scenario,
  scenario => scenario
);

const selectFilters = createSelector(
  state => state.stepFilters,
  filters => filters
);

const selectProps = createStructuredSelector({
  scenario: selectScenario,
  filters: selectFilters
});

const ScenarioDetailsContainer = connect(selectProps, {
  onFilterChange: updateStepFilters
})(ScenarioDetails);

export default ScenarioDetailsContainer;
