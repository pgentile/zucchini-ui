import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import TestRunPage from "./TestRunPage";

import { loadTestRunPage } from "../redux";
import selectQueryParams from "../../selectQueryParams";

const selectSelectedFeatureGroup = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.featureGroup || null;
  },
  selectedFeatureGroup => selectedFeatureGroup
);

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  testRunId => testRunId
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun
);

const selectProps = createStructuredSelector({
  selectedFeatureGroup: selectSelectedFeatureGroup,
  testRunId: selectTestRunId,
  testRun: selectTestRun
});

export default withRouter(
  connect(selectProps, {
    onLoad: loadTestRunPage
  })(TestRunPage)
);
