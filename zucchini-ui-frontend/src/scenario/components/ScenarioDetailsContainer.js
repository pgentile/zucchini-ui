import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioDetails from "./ScenarioDetails";

const selectScenario = createSelector(
  (state) => state.scenario.scenario,
  (scenario) => scenario
);

const selectFilters = createSelector(
  (state) => state.stepFilters,
  (filters) => filters
);

const selectProps = createStructuredSelector({
  scenario: selectScenario,
  filters: selectFilters
});

const ScenarioDetailsContainer = connect(selectProps)(ScenarioDetails);

export default ScenarioDetailsContainer;
