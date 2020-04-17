import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { ZERO_STATS_NUMBERS } from "../../testRun/model.js";

import ReportsTable from "./ReportsTable";

function sumStats(left, right) {
  return {
    count: left.count + right.count,
    passed: left.passed + right.passed,
    failed: left.failed + right.failed,
    pending: left.pending + right.pending,
    notRun: left.notRun + right.notRun
  };
}

const selectGroups = createSelector(
  (state) => state.testRun.features,
  (features) => {
    // Unique group names, sorted
    let groupNames = new Set(features.map((feature) => feature.group));
    groupNames = Array.from(groupNames.values()).sort();

    // Stats by group

    const groups = groupNames.map((groupName) => {
      const stats = features
        .filter((feature) => feature.group === groupName)
        .map((feature) => feature.stats.all)
        .reduce(sumStats, ZERO_STATS_NUMBERS);

      return {
        name: groupName || "",
        stats
      };
    });

    // Total stats

    const totalStats = groups.map((group) => group.stats).reduce(sumStats, ZERO_STATS_NUMBERS);

    const total = {
      name: "Total",
      total: true,
      stats: totalStats
    };

    groups.push(total);

    // Compute ratio

    groups.forEach((group) => {
      group.stats.faultRate = ((group.stats.failed / group.stats.count) * 100).toFixed(2);
      group.stats.faultRateRepartition = ((group.stats.failed / total.stats.failed) * 100).toFixed(2);
    });

    return groups;
  }
);

const selectProps = createStructuredSelector({
  groups: selectGroups
});

export default connect(selectProps)(ReportsTable);
