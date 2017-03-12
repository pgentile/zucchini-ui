import { connect } from 'react-redux';
// import { createSelector } from 'reselect';

import ScenarioStats from './ScenarioStats';


const ScenarioStatsContainer = connect(
  state => ({
    stats: state.testRun.stats,
  }),
)(ScenarioStats);

export default ScenarioStatsContainer;
