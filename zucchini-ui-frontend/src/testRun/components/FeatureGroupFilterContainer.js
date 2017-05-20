import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeatureGroupFilter from './FeatureGroupFilter';


const selectFeatureGroups = createSelector(
  state => state.testRun.features,
  features => {
    const groupSet = new Set(features.map(feature => feature.group).filter(group => !!group));
    const groups = Array.from(groupSet);
    groups.sort();
    return groups;
  }
);

const selectProps = createStructuredSelector({
  featureGroups: selectFeatureGroups,
});


const FeatureGroupFilterContainer = connect(
  selectProps,
)(FeatureGroupFilter);

export default FeatureGroupFilterContainer;
