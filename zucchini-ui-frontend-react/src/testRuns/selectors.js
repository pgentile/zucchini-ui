import { createSelector } from 'reselect';


export const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => testRun.type));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);


export const selectTestRuns = createSelector(
  state => state.testRuns.testRuns,
  testRuns => testRuns,
);
