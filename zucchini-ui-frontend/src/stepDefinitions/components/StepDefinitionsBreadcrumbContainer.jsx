import React, { memo } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";
import getTypeEnvName from "../../utils/testRunUtils";

function StepDefinitionsBreadcrumbContainer() {
  const testRun = useSelector((state) => state.testRun.testRun);

  const items = [
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
      value: "Glues"
    }
  ];

  return <Breadcrumb items={items} />;
}

export default memo(StepDefinitionsBreadcrumbContainer);
