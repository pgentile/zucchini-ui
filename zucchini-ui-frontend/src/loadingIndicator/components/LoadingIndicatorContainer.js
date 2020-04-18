import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import LoadingIndicator from "./LoadingIndicator";

const selectActive = createSelector(
  (state) => state.loadingIndicator.count,
  (count) => Boolean(count)
);

const selectProps = createStructuredSelector({
  active: selectActive
});

export default connect(selectProps)(LoadingIndicator);
