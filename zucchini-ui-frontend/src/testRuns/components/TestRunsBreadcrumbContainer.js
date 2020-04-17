import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import selectQueryParams from "../../selectQueryParams";

const selectBreadcumbItems = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.type || null;
  },
  (selectedType) => {
    const items = [
      {
        value: "Derniers tirs",
        link: "/"
      }
    ];

    if (selectedType) {
      items.push({
        value: `Type ${selectedType}`,
        link: {
          pathname: "/",
          search: queryString.stringify({ type: selectedType })
        }
      });
    }

    return items;
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

export default withRouter(connect(selectProps)(Breadcrumb));
