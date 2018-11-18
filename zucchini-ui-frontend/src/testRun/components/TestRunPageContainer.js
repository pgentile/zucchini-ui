import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunPage from "./TestRunPage";

import { loadTestRunPage } from "../redux";

const selectSelectedFeatureGroup = createSelector(
  (state, ownProps) => ownProps.location.query.featureGroup || null,
  selectedFeatureGroup => selectedFeatureGroup
);

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.params.testRunId,
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

const TestRunPageContainer = connect(
  selectProps,
  {
    onLoad: loadTestRunPage
  }
)(TestRunPage);

export default TestRunPageContainer;
