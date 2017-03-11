import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TestRunsPage from './TestRunsPage';
import { getLatestTestRuns } from '../redux';


const selectSelectedType = createSelector(
  (state, ownProps) => ownProps.location.query.type || null,
  selectedType => selectedType,
);


const TestRunsPageContainer = connect(
  (state, ownProps) => ({
    selectedType: selectSelectedType(state, ownProps),
  }),
  {
    onLoad: getLatestTestRuns,
  }
)(TestRunsPage);

export default TestRunsPageContainer;
