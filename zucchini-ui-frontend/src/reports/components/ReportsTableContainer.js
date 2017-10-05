import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';
import {createStatsWithZeros} from '../../testRun/model.js'

import ReportsTable from './ReportsTable';


const selectGroups = createSelector(
  state => state.testRun.features,
  features => {
    const groupSet = new Set(features.map(feature => feature.group));
    const groups = [];
    const allTotal = {
      count: 0,
      passed: 0,
      failed: 0,
      pending: 0,
      notRun: 0
    };
    for (const tmpGroup of groupSet.values()) {
      groups.push(
        {
          name: tmpGroup,
          stats: features.filter(feature => feature.group === tmpGroup)
            .map(feature => feature.stats)
            .reduce((aggregateStat, stat) => {
              allTotal.count = allTotal.count + stat.all.count;
              allTotal.passed = allTotal.passed + stat.all.passed;
              allTotal.failed = allTotal.failed + stat.all.failed;
              allTotal.pending = allTotal.pending + stat.all.pending;
              allTotal.notRun = allTotal.notRun + stat.all.notRun;
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


    // Compute total
    const total = {
      name: 'total',
      stats: {
        all: allTotal
      }
    }
    groups.push(total);

    // Compute ratio
    for (const group of groups) {
      group.stats.all.faultRate = ((group.stats.all.failed / group.stats.all.count) * 100).toFixed(2);
      group.stats.all.faultRateRepartition = ((group.stats.all.failed / total.stats.all.failed) * 100).toFixed(2);
    }

    return groups;
  }
);

const selectProps = createStructuredSelector({
  groups: selectGroups,
});


const ReportsTableContainer = connect(
  selectProps,
)(ReportsTable);

export default ReportsTableContainer;
