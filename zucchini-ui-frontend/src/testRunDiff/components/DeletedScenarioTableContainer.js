import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import UnknownScenarioTable from "./UnknownScenarioTable";

const selectScenarios = createSelector(
  state => state.testRunDiff.diff.deletedScenarii,
  scenarios => scenarios
);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios
});

export default connect(selectProps)(UnknownScenarioTable);
