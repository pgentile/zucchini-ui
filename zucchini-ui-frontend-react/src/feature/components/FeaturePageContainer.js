import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeaturePage from './FeaturePage';
import { getFeature } from '../redux';


const selectFeatureId = createSelector(
  (state, ownProps) => ownProps.params.featureId,
  featureId => featureId,
);

const selectProps = createStructuredSelector({
  featureId: selectFeatureId,
});


const FeaturePageContainer = connect(
  selectProps,
  {
    onLoad: getFeature,
  }
)(FeaturePage);

export default FeaturePageContainer;
