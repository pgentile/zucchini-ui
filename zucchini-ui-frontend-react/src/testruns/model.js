import { default as testRunApi } from '../api/testRuns';

export function getLatestsTestRuns() {
  // Fake stats
  const defaultStats = {
    count: null,
    passed: null,
    failed: null,
    pending: null,
    notRun: null,
  };

  return testRunApi.getLatests({ withStats: false })
    .then(testRuns => {
      return testRuns.map(testRun => ({
        ...testRun,
        stats: {
          all: defaultStats,
          reviewed: defaultStats,
          nonReviewed: defaultStats,
        },
      }))
    });
}


export function getLatestsTestRunsWithStats() {
  return testRunApi.getLatests({ withStats: true });
}
