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
  state => state.testRun.testRun.environment || null,
  state => state.historyFilters.sameTestRunType,
  state => state.historyFilters.sameTestRunEnvironment,
  (history, testRunType, testRunEnvironment, sameTestRunType, sameTestRunEnvironment) => {
    let selectedTestRuns = history;

    if (sameTestRunType) {
      selectedTestRuns = selectedTestRuns.filter(scenario => scenario.testRun.type === testRunType);
    }

    if (sameTestRunEnvironment) {
      selectedTestRuns = selectedTestRuns.filter(scenario => scenario.testRun.environment === testRunEnvironment);
    }

    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  scenarioId: selectScenarioId,
  history: selectHistory
});

const ScenarioHistoryTableContainer = connect(selectProps)(ScenarioHistoryTable);

export default ScenarioHistoryTableContainer;
