import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunDiffResultPage from "./TestRunDiffResultPage";
import { loadTestRunDiffResultPage } from "../redux";

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun
);

const selectOtherTestRun = createSelector(
  state => state.testRunDiff.otherTestRun,
  otherTestRun => otherTestRun
);

const selectProps = createStructuredSelector({
  testRun: selectTestRun,
  otherTestRun: selectOtherTestRun
});

export default connect(selectProps, {
  onLoad: loadTestRunDiffResultPage
})(TestRunDiffResultPage);
