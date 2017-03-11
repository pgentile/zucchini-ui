import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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


const TestRunBreadcrumbContainer = connect(
  (state, ownProps) => ({
    items: selectBreadcumbItems(state, ownProps),
  }),
)(Breadcrumb);

export default TestRunBreadcrumbContainer;
