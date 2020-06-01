import React, { memo } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import toNiceDate from "../../ui/toNiceDate";

function ScenarioBreadcrumbContainer() {
  const testRun = useSelector((state) => state.testRun.testRun);
  const feature = useSelector((state) => state.feature.feature);
  const scenario = useSelector((state) => state.scenario.scenario);

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
      value: `${feature.info.keyword} ${feature.info.name}`,
      link: `/features/${feature.id}`
    },
    {
      value: `${scenario.info.keyword} ${scenario.info.name}`
    }
  ];

  return <Breadcrumb items={items} />;
}

export default memo(ScenarioBreadcrumbContainer);
