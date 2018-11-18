import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import TestRunDiffPage from "./TestRunDiffPage";
import { selectQueryParams } from "../../history2";

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  testRunId => testRunId
);

const selectOtherTestRunId = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.otherTestRunId;
  },
  otherTestRunId => otherTestRunId
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  otherTestRunId: selectOtherTestRunId
});

export default withRouter(connect(selectProps)(TestRunDiffPage));
