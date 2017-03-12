import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeatureScenarioTable from './FeatureScenarioTable';


const selectScenarios = createSelector(
  state => state.feature.scenarios,
  scenarios => scenarios,
);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios,
});


const FeatureScenarioTableContainer = connect(
  selectProps,
)(FeatureScenarioTable);

export default FeatureScenarioTableContainer;
