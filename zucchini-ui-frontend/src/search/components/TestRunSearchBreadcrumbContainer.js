import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";
import getTypeEnvName from "../../utils/testRunUtils";

export default function TestRunSearchBreadcrumbContainer() {
  const testRun = useSelector((state) => state.testRun.testRun);

  const items = useMemo(() => {
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
        value: "Recherche"
      }
    ];
  }, [testRun]);

  return <Breadcrumb items={items} />;
}
