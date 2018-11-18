import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioPage from "./ScenarioPage";
import { loadScenarioPage, setNonReviewedStateThenReload } from "../redux";

const selectScenarioId = createSelector(
  (state, ownProps) => ownProps.params.scenarioId,
  scenarioId => scenarioId
);

const selectScenario = createSelector(
  state => state.scenario.scenario,
  scenario => scenario
);

const selectProps = createStructuredSelector({
  scenarioId: selectScenarioId,
  scenario: selectScenario
});

const ScenarioPageContainer = connect(
  selectProps,
  {
    onLoad: loadScenarioPage,
    onSetNonReviewedState: setNonReviewedStateThenReload
  }
)(ScenarioPage);

export default ScenarioPageContainer;
