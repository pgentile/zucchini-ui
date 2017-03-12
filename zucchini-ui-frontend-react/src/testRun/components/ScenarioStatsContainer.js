import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import ScenarioStats from './ScenarioStats';
import { updateStatsDashboardFilters } from '../../filters/redux';



const selectStats = createSelector(
  state => state.testRun.stats,
  stats => stats,
);

const selectShowDetails = createSelector(
  state => state.statsDashboardFilters.showDetails,
  showDetails => showDetails,
);

const selectProps = createStructuredSelector({
  stats: selectStats,
  showDetails: selectShowDetails,
})


const ScenarioStatsContainer = connect(
  selectProps,
  {
    onToggleDetails: updateStatsDashboardFilters,
  },
)(ScenarioStats);

export default ScenarioStatsContainer;
