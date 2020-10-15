import { memo } from "react";
import { useSelector } from "react-redux";
import TrendChart from "../../stats/components/TrendChart";

function FeatureTrendChartContainer() {
  const trends = useTrends();
  return <TrendChart trends={trends} />;
}

export default memo(FeatureTrendChartContainer);

function useTrends() {
  const history = useSelector((state) => state.feature.history ?? []);
  const featureId = useSelector((state) => state.feature.feature.id);
  const testRunType = useSelector((state) => state.testRun.testRun.type);
  const testRunEnv = useSelector((state) => state.testRun.testRun.environment);
  const { sameTestRunType, sameTestRunEnvironment } = useSelector((state) => state.historyFilters);

  let trendHistory = Array.from(history).reverse();

  if (sameTestRunType) {
    trendHistory = trendHistory.filter((item) => item.testRun.type === testRunType);
  }
  if (sameTestRunEnvironment) {
    trendHistory = trendHistory.filter((item) => item.testRun.environment === testRunEnv);
  }

  const featureHistoryIndex = trendHistory.findIndex((item) => item.id === featureId);
  trendHistory = trendHistory.slice(0, featureHistoryIndex + 1);

  return trendHistory.map((item) => item.stats.all);
}
