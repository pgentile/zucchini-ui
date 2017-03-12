import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import Breadcrumb from '../../ui/components/Breadcrumb';
import toNiceDate from '../../ui/toNiceDate';


const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  state => state.feature.feature,
  (testRun, feature) => {
    if (feature.info === undefined) {
      return [];
    }

    return [
      {
        value: `Type ${testRun.type}`,
        link: { pathname: '/', query: { type: testRun.type } },
      },
      {
        value: `Tir du ${toNiceDate(testRun.date)}`,
        link: { pathname: `/test-runs/${testRun.id}` },
      },
      {
        value: `${feature.info.keyword} ${feature.info.name}`,
      },
    ];
  },
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems,
})


const FeatureBreadcrumbContainer = connect(
  selectProps,
)(Breadcrumb);

export default FeatureBreadcrumbContainer;
