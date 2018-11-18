import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import LoadingIndicator from "./LoadingIndicator";

const selectActive = createSelector(
  state => state.loadingIndicator.loading,
  loading => loading
);

const selectProps = createStructuredSelector({
  active: selectActive
});

export default connect(selectProps)(LoadingIndicator);
