import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { loadTestRunFailuresPage } from "../redux";

import FailuresPage from "./FailuresPage";

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  testRunId => testRunId
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun
);

const selectFailures = createSelector(
  state => state.failures,
  testRun => testRun
);

const selectStats = createSelector(
  state => state.testRun.stats,
  testRun => testRun
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  testRun: selectTestRun,
  failures: selectFailures,
  stats: selectStats
});

const FailuresPageContainer = connect(selectProps, {
  onLoad: loadTestRunFailuresPage
})(FailuresPage);

export default FailuresPageContainer;
