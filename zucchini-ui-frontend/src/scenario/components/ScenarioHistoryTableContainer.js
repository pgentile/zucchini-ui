import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioHistoryTable from "./ScenarioHistoryTable";

const selectScenarioId = createSelector(
  (state, ownProps) => ownProps.scenarioId,
  scenarioId => scenarioId
);

const selectHistory = createSelector(
  state => state.scenario.history,
  state => state.testRun.testRun.type || null,
  state => state.historyFilters.sameTestRunType,
  (history, testRunType, sameTestRunType) => {
    if (sameTestRunType) {
      return history.filter(scenario => scenario.testRun.type === testRunType);
    }

    return history;
  }
);

const selectProps = createStructuredSelector({
  scenarioId: selectScenarioId,
  history: selectHistory
});

const ScenarioHistoryTableContainer = connect(selectProps)(ScenarioHistoryTable);

export default ScenarioHistoryTableContainer;
