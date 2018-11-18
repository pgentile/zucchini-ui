import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import TestRunsPage from "./TestRunsPage";
import { loadTestRunsPage } from "../redux";
import { selectQueryParams } from "../../history2";

const selectSelectedType = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.type || null;
  },
  selectedType => selectedType
);

const selectProps = createStructuredSelector({
  selectedType: selectSelectedType
});

export default withRouter(
  connect(
    selectProps,
    {
      onLoad: loadTestRunsPage
    }
  )(TestRunsPage)
);
