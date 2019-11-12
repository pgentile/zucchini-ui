import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TagsPage from "./TagsPage";

import { loadTestRunTagsPage } from "../redux";

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  testRunId => testRunId
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  testRun: selectTestRun
});

const TagsPageContainer = connect(selectProps, {
  onLoad: loadTestRunTagsPage
})(TagsPage);

export default TagsPageContainer;
