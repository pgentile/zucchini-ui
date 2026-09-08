import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";

const selectBreadcumbItems = createSelector(
  (state) => state.testRun.testRun,
  (testRun) => {
    return [
      {
        value: `Type ${testRun.type}`,
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
        value: "Tags",
        link: `/test-runs/${testRun.id}/tags`
      },
      {
        value: "Sélection de tags"
      }
    ];
  }
);

export default function TagDetailsBreadcrumbContainer() {
  const items = useSelector(selectBreadcumbItems);
  return <Breadcrumb items={items} />;
}
