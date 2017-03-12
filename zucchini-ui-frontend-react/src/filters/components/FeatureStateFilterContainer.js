import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import FeatureStateFilter from './FeatureStateFilter';
import { updateFeatureFilters } from '../redux';


const selectFilters = createSelector(
  state => state.featureFilters,
  featureFilters => featureFilters,
);

const selectProps = createStructuredSelector({
  filters: selectFilters,
});


const FeatureStateFilterContainer = connect(
  selectProps,
  {
    onFilterChange: updateFeatureFilters,
  },
)(FeatureStateFilter);

export default FeatureStateFilterContainer;
