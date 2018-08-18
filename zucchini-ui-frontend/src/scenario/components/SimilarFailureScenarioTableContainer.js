import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioTable from "../../ui/components/ScenarioTable";

const selectScenarios = createSelector(state => state.scenario.similarFailureScenarios, scenarios => scenarios);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios
});

export default connect(selectProps)(ScenarioTable);
