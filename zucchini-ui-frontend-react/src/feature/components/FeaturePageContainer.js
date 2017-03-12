import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeaturePage from './FeaturePage';
import { getFeature } from '../redux';


const selectFeatureId = createSelector(
  (state, ownProps) => ownProps.params.featureId,
  featureId => featureId,
);

const selectFeature = createSelector(
  state => state.feature.feature,
  feature => feature,
);

const selectProps = createStructuredSelector({
  featureId: selectFeatureId,
  feature: selectFeature,
});


const FeaturePageContainer = connect(
  selectProps,
  {
    onLoad: getFeature,
  }
)(FeaturePage);

export default FeaturePageContainer;
