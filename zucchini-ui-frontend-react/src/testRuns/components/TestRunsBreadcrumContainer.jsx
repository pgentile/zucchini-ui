import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunsBreadcrum from './TestRunsBreadcrum';


const selectSelectedType = createSelector(
  (state, ownProps) => ownProps.location.query.type || null,
  selectedType => selectedType,
);


const TestRunsBreadcrumContainer = connect(
  (state, ownProps) => ({
    selectedType: selectSelectedType(state, ownProps),
  }),
)(TestRunsBreadcrum);

export default TestRunsBreadcrumContainer;
