import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  testRun => {
    return [
      {
        value: `Type ${testRun.type}`,
        link: { pathname: "/", query: { type: testRun.type } }
      },
      {
        value: `Tir du ${toNiceDate(testRun.date)}`,
        link: { pathname: `/test-runs/${testRun.id}` }
      },
      {
        value: "Glues"
      }
    ];
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

const StepDefinitionsBreadcrumbContainer = connect(selectProps)(Breadcrumb);

export default StepDefinitionsBreadcrumbContainer;
