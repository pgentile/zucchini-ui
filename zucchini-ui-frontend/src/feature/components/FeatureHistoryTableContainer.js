import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import FeatureHistoryTable from "./FeatureHistoryTable";

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

export default function FeatureHistoryTableContainer({ featureId }) {
  const history = useSelector(selectHistory);
  return <FeatureHistoryTable featureId={featureId} history={history} />;
}

FeatureHistoryTableContainer.propTypes = {
  featureId: PropTypes.string.isRequired
};
