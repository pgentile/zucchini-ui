import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import Breadcrumb from '../../ui/components/Breadcrumb';
import toNiceDate from '../../ui/toNiceDate';


const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  testRun => {
    return [
      {
        value: `Type ${testRun.type}`,
        link: { pathname: '/', query: { type: testRun.type } },
      },
      {
        value: `Tir du ${toNiceDate(testRun.date)}`,
      },
    ];
  },
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems,
})


const TestRunBreadcrumbContainer = connect(
  selectProps,
)(Breadcrumb);

export default TestRunBreadcrumbContainer;
