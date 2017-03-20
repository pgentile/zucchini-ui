import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import ScenarioHistoryTable from './ScenarioHistoryTable';


const selectScenarioId = createSelector(
  (state, ownProps) => ownProps.scenarioId,
  scenarioId => scenarioId,
);

const selectHistory = createSelector(
  state => state.scenario.history,
  history => history,
);

const selectProps = createStructuredSelector({
  scenarioId: selectScenarioId,
  history: selectHistory,
});


const ScenarioHistoryTableContainer = connect(
  selectProps,
)(ScenarioHistoryTable);

export default ScenarioHistoryTableContainer;
