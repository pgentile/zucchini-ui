import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { selectLatestTestRuns } from "../../testRuns/selectors";
import TestRunSelectorTable from "./TestRunSelectorTable";

const selectTestRuns = createSelector(
  state => selectLatestTestRuns(state),
  state => state.testRun.testRun.type || null,
  state => state.historyFilters.sameTestRunType,
  (testRuns, currentTestRunType, sameTestRunTypeFilter) => {
    let selectedTestRuns = testRuns;

    if (sameTestRunTypeFilter) {
      selectedTestRuns = selectedTestRuns.filter(testRun => testRun.type === currentTestRunType);
    }

    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  testRuns: selectTestRuns
});

export default connect(selectProps)(TestRunSelectorTable);
