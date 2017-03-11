import { default as testRunsApi } from '../api/testRuns';
import { default as scenariosApi } from '../api/scenarios';


export function getTestRun({ testRunId }) {
  return testRunsApi.getTestRun({ testRunId });
}

export function getTestRunStats({ testRunId }) {
  return scenariosApi.getStats({ testRunId });
}

export function createStatsWithZeros() {
  return {
    all: ZERO_STATS_NUMBERS,
    reviewed: ZERO_STATS_NUMBERS,
    nonReviewed: ZERO_STATS_NUMBERS,
  };
}

const ZERO_STATS_NUMBERS = {
  count: 0,
  passed: 0,
  failed: 0,
  pending: 0,
  notRun: 0,
};
