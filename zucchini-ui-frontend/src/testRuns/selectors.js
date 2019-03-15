import { createSelector } from "reselect";

import { createStats, UNDEFINED_STATS_NUMBERS } from "./model";
import * as utils from "../utils/testRunUtils";

export const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => utils.getType(testRun.type)));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);

export const selectTestRunNoms = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const nomSet = new Set(testRuns.map(testRun => utils.getNom(testRun.type)));
    const noms = Array.from(nomSet);
    noms.sort();
    return noms;
  }
);

export const selectLatestTestRuns = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    return testRuns.map(testRun => {
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
