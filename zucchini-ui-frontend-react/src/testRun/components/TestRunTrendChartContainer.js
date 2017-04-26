import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import _ from 'lodash';

import TrendChart from '../../stats/components/TrendChart';


const selectTrends = createSelector(
  state => state.testRun.testRun.id,
  state => state.testRun.history,
  state => state.testRun.stats.all,
  (testRunId, history, currentTestRunTrend) => {
    let previousTrends = _.takeRightWhile(history, testRun => testRun.id !== testRunId);
    previousTrends = previousTrends.map(testRun => testRun.stats.all);

    return [...previousTrends, currentTestRunTrend];
  },
);

const selectProps = createStructuredSelector({
  trends: selectTrends,
})


const TestRunTrendChartContainer = connect(
  selectProps,
)(TrendChart);

export default TestRunTrendChartContainer;
