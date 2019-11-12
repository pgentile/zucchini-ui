import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

import TagDetailsPage from "./TagDetailsPage";

import { loadTagDetailsPage } from "../redux";
import selectQueryParams from "../../selectQueryParams";

function parseTags(tags) {
  if (isString(tags)) {
    return [tags];
  }
  if (isEmpty(tags)) {
    return [];
  }
  return tags;
}

const selectTags = createSelector((state, ownProps) => {
  const queryParams = selectQueryParams(ownProps.location);
  return queryParams.tag;
}, parseTags);

const selectExcludedTags = createSelector((state, ownProps) => {
  const queryParams = selectQueryParams(ownProps.location);
  return queryParams.excludedTag;
}, parseTags);

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
  testRun: selectTestRun,
  tags: selectTags,
  excludedTags: selectExcludedTags
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: ({ testRunId, tags, excludedTags }) => {
      dispatch(loadTagDetailsPage({ testRunId, tags, excludedTags }));
    },
    onUpdate: ({ testRunId, tags, excludedTags }) => {
      const q = queryString.stringify({ tag: tags, excludedTag: excludedTags });
      ownProps.history.push(`/test-runs/${testRunId}/tag-details?${q}`);
    }
  };
};

export default withRouter(connect(selectProps, mapDispatchToProps)(TagDetailsPage));
