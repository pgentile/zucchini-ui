import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TrendChart from "../../stats/components/TrendChart";

const selectTrends = createSelector(
  state => state.feature.history,
  state => state.feature.feature.id,
  state => state.testRun.testRun.type,
  state => state.historyFilters.sameTestRunType,
  (history, featureId, testRunType, sameTestRunType) => {
    let trendHistory = [...history];
    trendHistory.reverse();

    if (sameTestRunType) {
      trendHistory = trendHistory.filter(item => item.testRun.type === testRunType);
    }

    const featureHistoryIndex = trendHistory.findIndex(item => item.id === featureId);
    trendHistory = trendHistory.slice(0, featureHistoryIndex + 1);

    return trendHistory.map(item => item.stats.all);
  }
);

const selectProps = createStructuredSelector({
  trends: selectTrends
});

const FeatureTrendChartContainer = connect(selectProps)(TrendChart);

export default FeatureTrendChartContainer;
