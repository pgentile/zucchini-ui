import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";
import selectQueryParams from "../../selectQueryParams";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.otherTestRunId;
  },
  (testRun, otherTestRunId) => {
    const breadcrumb = [
      {
        value: `Type ${testRun.type}`,
        link: { pathname: "/", query: { type: testRun.type } }
      },
      {
        value: `Tir du ${toNiceDate(testRun.date)}`,
        link: { pathname: `/test-runs/${testRun.id}` }
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
