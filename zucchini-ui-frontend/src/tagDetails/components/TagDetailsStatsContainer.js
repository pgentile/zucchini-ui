import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioStatsContainer from "../../stats/components/ScenarioStatsContainer";

const selectStats = createSelector(
  (state) => state.tagDetails.stats,
  (stats) => stats
);

const selectProps = createStructuredSelector({
  stats: selectStats
});

export default connect(selectProps)(ScenarioStatsContainer);
