import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioStatsContainer from "../../stats/components/ScenarioStatsContainer";

const selectStats = createSelector(
  state => state.testRun.stats,
  stats => stats
);

const selectProps = createStructuredSelector({
  stats: selectStats
});

const TestRunStatsContainer = connect(selectProps)(ScenarioStatsContainer);

export default TestRunStatsContainer;
