import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { selectLatestTestRuns } from "../../testRuns/selectors";
import TestRunSelectorTable from "./TestRunSelectorTable";

const selectTestRuns = createSelector(
  (state) => selectLatestTestRuns(state),
  (state) => state.testRun.testRun.type || null,
  (state) => state.testRun.testRun.environment || null,
  (state) => state.historyFilters.sameTestRunType,
  (state) => state.historyFilters.sameTestRunEnvironment,
  (testRuns, currentTestRunType, currentTestRunEnvironment, sameTestRunTypeFilter, sameTestRunEnvironmentFilter) => {
    let selectedTestRuns = testRuns;

    if (sameTestRunTypeFilter) {
      selectedTestRuns = selectedTestRuns.filter((testRun) => testRun.type === currentTestRunType);
    }

    if (sameTestRunEnvironmentFilter) {
      selectedTestRuns = selectedTestRuns.filter((testRun) => testRun.environment === currentTestRunEnvironment);
    }

    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  testRuns: selectTestRuns
});

export default connect(selectProps)(TestRunSelectorTable);
