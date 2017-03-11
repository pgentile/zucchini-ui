import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunsBreadcrum from '../components/TestRunsBreadcrum';


const selectSelectedType = createSelector(
  state => state.testRuns.selectedType,
  selectedType => selectedType,
);

const TestRunsBreadcrumContainer = connect(
  state => ({
    selectedType: selectSelectedType(state),
  }),
)(TestRunsBreadcrum);

export default TestRunsBreadcrumContainer;
