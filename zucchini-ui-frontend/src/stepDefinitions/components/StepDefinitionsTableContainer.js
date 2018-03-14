import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import StepDefinitionsTable from './StepDefinitionsTable';

const selectStepDefinitions = createSelector(
  state => state.stepDefinitions.stepDefinitions,
  stepDefinitions => stepDefinitions,
);

const selectProps = createStructuredSelector({
  stepDefinitions: selectStepDefinitions
});

const StepDefinitionsTableContainer = connect(
  selectProps,
)(StepDefinitionsTable);

export default StepDefinitionsTableContainer;
