/* eslint-disable */

import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import TestRunSearchPage from "./TestRunSearchPage";
import { loadTestRunSearchPage, search as doSearch } from "../redux";
import { selectQueryParams } from "../../history2";

const selectSearch = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.search || "";
  },
  search => search
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
  search: selectSearch,
  testRunId: selectTestRunId,
  testRun: selectTestRun
});

const mapDispatchToProps = (dispatch, ownProps) => {
  console.info("ownProps =", ownProps);
  return {
    onLoad: ({ testRunId }) => {
      return dispatch(loadTestRunSearchPage({ testRunId }));
    },
    onSearch: ({ testRunId, search }) => {
      dispatch(doSearch({ search, testRunId }));

      const q = queryString.stringify({ search });
      ownProps.history.push(`/test-runs/${testRunId}/search?${q}`);
    }
  };
};

export default withRouter(
  connect(
    selectProps,
    mapDispatchToProps
  )(TestRunSearchPage)
);
