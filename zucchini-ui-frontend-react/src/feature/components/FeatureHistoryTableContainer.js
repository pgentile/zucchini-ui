import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeatureHistoryTable from './FeatureHistoryTable';


const selectFeatureId = createSelector(
  (state, ownProps) => ownProps.featureId,
  featureId => featureId,
);

const selectHistory = createSelector(
  state => state.feature.history,
  history => history,
);

const selectProps = createStructuredSelector({
  featureId: selectFeatureId,
  history: selectHistory,
});


const FeatureHistoryTableContainer = connect(
  selectProps,
)(FeatureHistoryTable);

export default FeatureHistoryTableContainer;
