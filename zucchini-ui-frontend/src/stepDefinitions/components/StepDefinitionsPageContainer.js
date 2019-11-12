import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { loadTestRunStepDefinitionsPage } from "../redux";

import StepDefinitionsPage from "./StepDefinitionsPage";

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  testRunId => testRunId
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun
);

const selectStepDefinitions = createSelector(
  state => state.stepDefinitions,
  testRun => testRun
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  testRun: selectTestRun,
  stepDefinitions: selectStepDefinitions
});

const StepDefinitionsPageContainer = connect(selectProps, {
  onLoad: loadTestRunStepDefinitionsPage
})(StepDefinitionsPage);

export default StepDefinitionsPageContainer;
