import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import ScenarioStats from './ScenarioStats';


const selectStats = createSelector(
  state => state.testRun.stats,
  stats => stats,
);

const selectProps = createStructuredSelector({
  stats: selectStats,
})


const ScenarioStatsContainer = connect(
  selectProps,
)(ScenarioStats);

export default ScenarioStatsContainer;
