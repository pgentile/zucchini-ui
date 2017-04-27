import { default as testRunsApi } from '../api/testRuns';


export function getLatestsTestRuns() {
  return testRunsApi.getLatests({ withStats: false })
    .then(testRuns => {
      return testRuns.map(testRun => ({
        ...testRun,
        stats: createStats(UNDEFINED_STATS_NUMBERS),
      }))
    });
}


export function getLatestsTestRunsWithStats() {
  return testRunsApi.getLatests({ withStats: true });
}


export function createTestRun({ type }) {
  return testRunsApi.createTestRun({ type })
    .then(response => {
      return testRunsApi.getTestRun({ testRunId: response.id });
    })
    .then(testRun => ({
      ...testRun,
      stats: createStats(ZERO_STATS_NUMBERS),
    }));
}


export function deleteTestRun({ testRunId }) {
  return testRunsApi.deleteTestRun({ testRunId });
}


export async function deleteManyTestRuns({ testRunIds }) {
  const results = testRunIds.map(testRunId => {
    testRunsApi.deleteTestRun({ testRunId });
  });

  await Promise.all(results);

  return null;
}


function createStats(numbers) {
  return {
    all: numbers,
    reviewed: numbers,
    nonReviewed: numbers,
  };
}


const UNDEFINED_STATS_NUMBERS = {
  count: null,
  passed: null,
  failed: null,
  pending: null,
  notRun: null,
};


const ZERO_STATS_NUMBERS = {
  count: 0,
  passed: 0,
  failed: 0,
  pending: 0,
  notRun: 0,
};
