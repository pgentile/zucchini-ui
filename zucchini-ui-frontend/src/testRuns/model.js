import { default as testRunsApi } from "../api/testRuns";

export function getLatestsTestRuns() {
  return testRunsApi.getLatests({ withStats: false });
}

export function getLatestsTestRunsWithStats() {
  return testRunsApi.getLatests({ withStats: true });
}

export async function createTestRun({ type, environment, name }) {
  const response = await testRunsApi.createTestRun({ type, environment, name });
  const testRun = await testRunsApi.getTestRun({ testRunId: response.id });
  return {
    ...testRun,
    stats: createStats(ZERO_STATS_NUMBERS)
  };
}

export function deleteTestRun({ testRunId }) {
  return testRunsApi.deleteTestRun({ testRunId });
}

export async function deleteManyTestRuns({ testRunIds }) {
  const results = testRunIds.map((testRunId) => {
    testRunsApi.deleteTestRun({ testRunId });
  });

  await Promise.all(results);

  return null;
}

export function createStats(numbers) {
  return {
    all: numbers,
    reviewed: numbers,
    nonReviewed: numbers
  };
}

export const UNDEFINED_STATS_NUMBERS = {
  count: null,
  passed: null,
  failed: null,
  pending: null,
  notRun: null
};

export const ZERO_STATS_NUMBERS = {
  count: 0,
  passed: 0,
  failed: 0,
  pending: 0,
  notRun: 0
};
