import { default as testRunApi } from '../api/testRuns';


export function getLatestsTestRuns() {
  return testRunApi.getLatests({ withStats: false })
    .then(testRuns => {
      return testRuns.map(testRun => ({
        ...testRun,
        stats: createStats(UNDEFINED_STATS_NUMBERS),
      }))
    });
}


export function getLatestsTestRunsWithStats() {
  return testRunApi.getLatests({ withStats: true });
}


export function createTestRun({ type }) {
  return testRunApi.createTestRun({ type })
    .then(response => {
      return testRunApi.getTestRun({ id: response.id });
    })
    .then(testRun => ({
      ...testRun,
      stats: createStats(ZERO_STATS_NUMBERS),
    }));
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
