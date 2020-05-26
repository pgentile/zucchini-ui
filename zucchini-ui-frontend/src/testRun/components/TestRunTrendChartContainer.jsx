import React, { memo } from "react";
import { useSelector } from "react-redux";

import TrendChart from "../../stats/components/TrendChart";

function TestRunTrendChartContainer() {
  const trends = useTrends();
  return <TrendChart trends={trends} />;
}

export default memo(TestRunTrendChartContainer);

function useTrends() {
  const history = useSelector((state) => state.testRun.history ?? []);
  const testRunId = useSelector((state) => state.testRun.testRun.id);

  let trendHistory = Array.from(history).reverse();

  const testRunIndex = trendHistory.findIndex((item) => item.id === testRunId);
  trendHistory = trendHistory.slice(0, testRunIndex + 1);

  return trendHistory.map((testRun) => testRun.stats.all);
}
