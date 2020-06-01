import React, { memo } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";

function TestRunBreadcrumbContainer() {
  const testRun = useSelector((state) => state.testRun.testRun);

  const items = [
    {
      value: `Type ${testRun.type}`,
      link: {
        pathname: "/",
        search: queryString.stringify({ type: testRun.type })
      }
    },
    {
      value: `Tir du ${toNiceDate(testRun.date)}`
    }
  ];

  return <Breadcrumb items={items} />;
}

export default memo(TestRunBreadcrumbContainer);
