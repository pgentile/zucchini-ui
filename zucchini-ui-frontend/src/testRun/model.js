import { default as testRunsApi } from "../api/testRuns";
import { default as scenariosApi } from "../api/scenarios";
import { default as featuresApi } from "../api/features";

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
    all: createZeroStatsNumbers(),
    reviewed: createZeroStatsNumbers(),
    nonReviewed: createZeroStatsNumbers()
  };
}

export function deleteTestRun({ testRunId }) {
  return testRunsApi.deleteTestRun({ testRunId });
}

export function importCucumberResult({ testRunId, file, ...options }) {
  return testRunsApi.importCucumberResult({ testRunId, file, ...options });
}

export function editTestRun({ testRunId, type, environment, name, labels }) {
  return testRunsApi.editTestRun({ testRunId, type, environment, name, labels });
}

export function createZeroStatsNumbers() {
  return {
    count: 0,
    passed: 0,
    failed: 0,
    pending: 0,
    notRun: 0
  };
}
