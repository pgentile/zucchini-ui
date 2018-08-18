import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TrendChart from "../../stats/components/TrendChart";

const selectTrends = createSelector(
  state => state.testRun.testRun.id,
  state => state.testRun.history,
  (testRunId, history) => {
    let trendHistory = [...history];
    trendHistory.reverse();

    const testRunIndex = trendHistory.findIndex(item => item.id === testRunId);
    trendHistory = trendHistory.slice(0, testRunIndex + 1);

    return trendHistory.map(testRun => testRun.stats.all);
  }
);

const selectProps = createStructuredSelector({
  trends: selectTrends
});

const TestRunTrendChartContainer = connect(selectProps)(TrendChart);

export default TestRunTrendChartContainer;
