import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TestRunsPage from './TestRunsPage';
import { getLatestTestRuns } from '../redux';


const selectSelectedType = createSelector(
  (state, ownProps) => ownProps.location.query.type || null,
  selectedType => selectedType,
);

const selectProps = createStructuredSelector({
  selectedType: selectSelectedType,
});


const TestRunsPageContainer = connect(
  selectProps,
  {
    onLoad: getLatestTestRuns,
  }
)(TestRunsPage);

export default TestRunsPageContainer;
