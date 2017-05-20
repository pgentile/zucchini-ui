import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import ScenarioStatsContainer from '../../stats/components/ScenarioStatsContainer';


const selectStats = createSelector(
  state => state.feature.stats,
  stats => stats,
);

const selectProps = createStructuredSelector({
  stats: selectStats,
})


const FeatureStatsContainer = connect(
  selectProps,
)(ScenarioStatsContainer);

export default FeatureStatsContainer;
