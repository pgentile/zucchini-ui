import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  state => state.feature.feature,
  state => state.scenario.scenario,
  (testRun, feature, scenario) => {
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
        value: `${feature.info.keyword} ${feature.info.name}`,
        link: { pathname: `/features/${feature.id}` }
      },
      {
        value: `${scenario.info.keyword} ${scenario.info.name}`
      }
    ];
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

const ScenarioBreadcrumbContainer = connect(selectProps)(Breadcrumb);

export default ScenarioBreadcrumbContainer;
