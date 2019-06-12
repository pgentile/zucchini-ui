import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  state => state.feature.feature,
  (testRun, feature) => {
    return [
      {
        value: `Type ${testRun.type}/   ${testRun.environment}/   ${testRun.name}`,
        link: {
          pathname: "/",
          search: queryString.stringify({ type: testRun.type })
        }
      },
      {
        value: `Tir du ${toNiceDate(testRun.date)}`,
        link: `/test-runs/${testRun.id}`
      },
      {
        value: `${feature.info.keyword} ${feature.info.name}`
      }
    ];
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

const FeatureBreadcrumbContainer = connect(selectProps)(Breadcrumb);

export default FeatureBreadcrumbContainer;
