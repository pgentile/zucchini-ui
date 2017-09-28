import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { createStatsWithZeros } from '../model.js'

import TestRunGroupTable from './TestRunGroupTable';


const selectGroups = createSelector(
  state => state.testRun.features,
  features => {
    const groupSet = new Set(features.map(feature => feature.group));
    let groups = [];
    let totalFailed = 0;
    for (let tmpGroup of groupSet.values()) {
      groups.push(
        {
          name: tmpGroup,
          stats: features.filter(feature => feature.group === tmpGroup)
            .map(feature => feature.stats)
            .reduce((aggregateStat, stat) => {
              totalFailed += stat.all.failed;
            return {
              all: {
                count: aggregateStat.all.count + stat.all.count,
                passed: aggregateStat.all.passed + stat.all.passed,
                failed: aggregateStat.all.failed + stat.all.failed,
                pending: aggregateStat.all.pending + stat.all.pending,
                notRun: aggregateStat.all.notRun + stat.all.notRun,
              },
            }
          }, createStatsWithZeros()),
        })
    }

    for (let group of groups) {
      group.stats.all.faultRate = ((group.stats.all.failed / group.stats.all.count) * 100).toFixed(2);
      group.stats.all.faultRateRepartition = ((group.stats.all.failed / totalFailed) * 100).toFixed(2);
    }


    return groups;
  }
);

const selectProps = createStructuredSelector({
  groups: selectGroups,
});


const TestRunGroupTableContainer = connect(
  selectProps,
)(TestRunGroupTable);

export default TestRunGroupTableContainer;
