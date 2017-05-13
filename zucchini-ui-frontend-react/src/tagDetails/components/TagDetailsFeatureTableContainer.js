import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { selectFeatureFilterFunc } from '../../filters/selectors';
import FeatureTable from '../../ui/components/FeatureTable';


const selectFeatures = createSelector(
  state => state.tagDetails.features,
  selectFeatureFilterFunc,
  (features, featureFilterFunc) => {
    let filteredFeatures = features;
    filteredFeatures = filteredFeatures.filter(featureFilterFunc);
    return filteredFeatures;
  },
);

const selectProps = createStructuredSelector({
  features: selectFeatures,
})


export default connect(
  selectProps,
)(FeatureTable);
