import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import ScenarioTable from './ScenarioTable';


const selectScenarios = createSelector(
  state => state.feature.scenarios,
  state => state.scenarioFilters,
  (scenarios, scenarioFilters) => {
    const filters = createScenarioFilters(scenarioFilters);

    if (filters) {
      let filteredScenarios = scenarios;
      filters.forEach(filter => {
        filteredScenarios = filteredScenarios.filter(filter);
      })
      return filteredScenarios;
    }

    return scenarios;
  },
);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios,
});



function createScenarioFilters(scenarioFilters) {
  let filters = [];

  if (!scenarioFilters.passed) {
    const filter = scenario => scenario.status !== 'PASSED';
    filters = [...filters, filter];
  }

  if (!scenarioFilters.failed) {
    const filter = scenario => scenario.status !== 'FAILED';
    filters = [...filters, filter];
  }

  if (!scenarioFilters.pending) {
    const filter = scenario => scenario.status !== 'PENDING';
    filters = [...filters, filter];
  }

  if (!scenarioFilters.notRun) {
    const filter = scenario => scenario.status !== 'NOT_RUN';
    filters = [...filters, filter];
  }

  if (!scenarioFilters.reviewed) {
    const filter = scenario => !scenario.reviewed;
    filters = [...filters, filter];
  }

  if (!scenarioFilters.notReviewed) {
    const filter = scenario => scenario.reviewed;
    filters = [...filters, filter];
  }

  return filters;
}


const ScenarioTableContainer = connect(
  selectProps,
)(ScenarioTable);

export default ScenarioTableContainer;
