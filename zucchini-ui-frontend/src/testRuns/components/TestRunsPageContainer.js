import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunsPage from "./TestRunsPage";
import { loadTestRunsPage } from "../redux";

const selectSelectedType = createSelector(
  (state, ownProps) => ownProps.location.query.type || null,
  selectedType => selectedType
);

const selectProps = createStructuredSelector({
  selectedType: selectSelectedType
});

const TestRunsPageContainer = connect(
  selectProps,
  {
    onLoad: loadTestRunsPage
  }
)(TestRunsPage);

export default TestRunsPageContainer;
