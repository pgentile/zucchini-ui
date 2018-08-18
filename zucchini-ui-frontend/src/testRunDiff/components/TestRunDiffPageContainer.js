import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunDiffPage from "./TestRunDiffPage";

const selectTestRunId = createSelector((state, ownProps) => ownProps.params.testRunId, testRunId => testRunId);

const selectOtherTestRunId = createSelector(
  (state, ownProps) => ownProps.location.query.otherTestRunId,
  otherTestRunId => otherTestRunId
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  otherTestRunId: selectOtherTestRunId
});

export default connect(selectProps)(TestRunDiffPage);
