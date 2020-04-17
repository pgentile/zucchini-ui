import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import FeatureHistoryTable from "./FeatureHistoryTable";

const selectFeatureId = createSelector(
  (state, ownProps) => ownProps.featureId,
  (featureId) => featureId
);

const selectHistory = createSelector(
  (state) => state.feature.history,
  (state) => state.testRun.testRun.type || null,
  (state) => state.testRun.testRun.environment || null,
  (state) => state.historyFilters.sameTestRunType,
  (state) => state.historyFilters.sameTestRunEnvironment,
  (history, testRunType, testRunEnvironment, sameTestRunType, sameTestRunEnvironment) => {
    let selectedTestRuns = history;

    if (sameTestRunType) {
      selectedTestRuns = selectedTestRuns.filter((feature) => feature.testRun.type === testRunType);
    }

    if (sameTestRunEnvironment) {
      selectedTestRuns = selectedTestRuns.filter((feature) => feature.testRun.environment === testRunEnvironment);
    }

    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  featureId: selectFeatureId,
  history: selectHistory
});

const FeatureHistoryTableContainer = connect(selectProps)(FeatureHistoryTable);

export default FeatureHistoryTableContainer;
