import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import DifferentScenarioTable from "./DifferentScenarioTable";

const selectDifferentScenarios = createSelector(
  state => state.testRunDiff.diff.differentScenarii,
  differentScenarios => differentScenarios
);

const selectProps = createStructuredSelector({
  differentScenarios: selectDifferentScenarios
});

export default connect(selectProps)(DifferentScenarioTable);
