import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";
import selectQueryParams from "../../selectQueryParams";
import queryString from "query-string";
import getTypeEnvName from "../../utils/testRunUtils";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.otherTestRunId;
  },
  (testRun, otherTestRunId) => {
    const breadcrumb = [
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
        value: "Comparaison",
        link: { pathname: `/test-runs/${testRun.id}/diff` }
      }
    ];

    if (otherTestRunId) {
      breadcrumb.push({
        value: "Résultat"
      });
    }

    return breadcrumb;
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

export default withRouter(connect(selectProps)(Breadcrumb));
