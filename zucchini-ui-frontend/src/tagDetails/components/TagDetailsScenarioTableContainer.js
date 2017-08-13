import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import sortBy from 'lodash-es/sortBy';

import { selectScenarioFilterFunc } from '../../filters/selectors';
import TagDetailsScenarioTable from './TagDetailsScenarioTable';


const selectFeaturesById = createSelector(
  state => state.tagDetails.features,
  features => {
    const featuresById = new Map();
    features.forEach(feature => {
      featuresById.set(feature.id, feature);
    });
    return featuresById;
  }
);


const DEFAULT_FEATURE = {
  info: {
    name: '',
  },
};


const selectScenarios = createSelector(
  state => state.tagDetails.scenarios,
  selectFeaturesById,
  selectScenarioFilterFunc,
  (scenarios, featuresById, scenarioFilterFunc) => {
    let selectedScenarios = scenarios
      .filter(scenarioFilterFunc)
      .map(scenario => {
        const feature = featuresById.get(scenario.featureId) || DEFAULT_FEATURE;
        return {
          ...scenario,
          feature,
        };
      });

    selectedScenarios = sortBy(selectedScenarios, [
      scenario => scenario.feature.info.name,
      scenario => scenario.info.name,
    ]);

    return selectedScenarios;
  },
);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios,
});

export default connect(
  selectProps,
)(TagDetailsScenarioTable);
