import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";
import getTypeEnvName from "../../utils/testRunUtils";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  state => state.feature.feature,
  state => state.scenario.scenario,
  (testRun, feature, scenario) => {
    return [
      {
        value: getTypeEnvName(testRun),
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
        value: `${feature.info.keyword} ${feature.info.name}`,
        link: `/features/${feature.id}`
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
