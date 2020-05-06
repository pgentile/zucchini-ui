import { createSelector } from "reselect";

import { createStats, UNDEFINED_STATS_NUMBERS } from "./model";

export const selectTestRunTypes = createSelector(
  (state) => state.testRuns.testRuns,
  (testRuns) => {
    const typeSet = new Set(testRuns.map((testRun) => testRun.type));
    return Array.from(typeSet).sort();
  }
);

export const selectLatestTestRuns = createSelector(
  (state) => state.testRuns.testRuns,
  (testRuns) => {
    return testRuns.map((testRun) => {
      if (testRun.stats) {
        return testRun;
      }

      return {
        ...testRun,
        stats: createStats(UNDEFINED_STATS_NUMBERS)
      };
    });
  }
);
