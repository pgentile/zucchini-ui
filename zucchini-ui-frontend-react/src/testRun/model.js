import { default as testRunsApi } from '../api/testRuns';
import { default as scenariosApi } from '../api/scenarios';
import { default as featuresApi } from '../api/features';


export function getTestRun({ testRunId }) {
  return testRunsApi.getTestRun({ testRunId });
}

export function getTestRunStats({ testRunId }) {
  return scenariosApi.getStats({ testRunId });
}

export function getTestRunHistoryByType({ type }) {
  return testRunsApi.getLatests({ type, withStats: true });
}

export function getFeatures({ testRunId }) {
  return featuresApi.getFeatures({ testRunId, withStats: true });
}

export function createStatsWithZeros() {
  return {
    all: ZERO_STATS_NUMBERS,
    reviewed: ZERO_STATS_NUMBERS,
    nonReviewed: ZERO_STATS_NUMBERS,
  };
}

export function deleteTestRun({ testRunId }) {
  return testRunsApi.deleteTestRun({ testRunId });
}

const ZERO_STATS_NUMBERS = {
  count: 0,
  passed: 0,
  failed: 0,
  pending: 0,
  notRun: 0,
};
