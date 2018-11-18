import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioTable from "../../ui/components/ScenarioTable";

const selectScenarios = createSelector(
  state => state.feature.scenarios,
  scenarios => scenarios
);

const selectScenarioId = createSelector(
  (state, ownProps) => ownProps.scenarioId,
  scenarioId => scenarioId
);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios,
  selectedScenarioId: selectScenarioId
});

const SameFeatureScenarioTableContainer = connect(selectProps)(ScenarioTable);

export default SameFeatureScenarioTableContainer;
