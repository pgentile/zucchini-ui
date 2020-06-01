import React, { memo } from "react";
import { useSelector } from "react-redux";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";
import queryString from "query-string";

import useQueryParams from "../../useQueryParams";

function TestRunDiffBreadcrumbContainer() {
  const { otherTestRunId } = useQueryParams();

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
      value: `Tir du ${toNiceDate(testRun.date)}`,
      link: `/test-runs/${testRun.id}`
    },
    {
      value: "Comparaison",
      link: { pathname: `/test-runs/${testRun.id}/diff` }
    }
  ];

  if (otherTestRunId) {
    items.push({
      value: "Résultat"
    });
  }

  return <Breadcrumb items={items} />;
}

export default memo(TestRunDiffBreadcrumbContainer);
