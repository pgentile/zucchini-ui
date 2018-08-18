import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunSearchPage from "./TestRunSearchPage";
import { loadTestRunSearchPage, search } from "../redux";

const selectSearch = createSelector((state, ownProps) => ownProps.location.query.search || "", search => search);

const selectTestRunId = createSelector((state, ownProps) => ownProps.params.testRunId, testRunId => testRunId);

const selectTestRun = createSelector(state => state.testRun.testRun, testRun => testRun);

const selectProps = createStructuredSelector({
  search: selectSearch,
  testRunId: selectTestRunId,
  testRun: selectTestRun
});

const TestRunSearchPageContainer = connect(
  selectProps,
  {
    onLoad: loadTestRunSearchPage,
    onSearch: search
  }
)(TestRunSearchPage);

export default TestRunSearchPageContainer;
