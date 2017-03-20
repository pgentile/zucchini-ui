import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeatureHistoryTable from './FeatureHistoryTable';


const selectFeatureId = createSelector(
  (state, ownProps) => ownProps.featureId,
  featureId => featureId,
);

const selectHistory = createSelector(
  state => state.feature.history,
  state => state.testRun.testRun.type || null,
  state => state.historyFilters.sameTestRunType,
  (history, testRunType, sameTestRunType) => {
    if (sameTestRunType) {
      return history.filter(feature => feature.testRun.type === testRunType);
    }

    return history;
  },
);

const selectProps = createStructuredSelector({
  featureId: selectFeatureId,
  history: selectHistory,
});


const FeatureHistoryTableContainer = connect(
  selectProps,
)(FeatureHistoryTable);

export default FeatureHistoryTableContainer;
