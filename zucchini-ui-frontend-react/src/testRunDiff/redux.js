import { handleActions } from 'redux-actions';

import { getLatestTestRuns, getLatestTestRunsWithStats } from '../testRuns/redux';
import { getTestRun } from '../testRun/redux';


// Actions

///// const PREFIX = 'TEST_RUN_DIFF';


// Action creators

export function loadTestRunDiffSelectorPage({ testRunId }) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const latestTestRunsResult$ = dispatch(getLatestTestRuns());
    const latestTestRunsWithStatsResult$ = dispatch(getLatestTestRunsWithStats());

    await testRunResult$;
    await latestTestRunsResult$;
    await latestTestRunsWithStatsResult$;

    return null;
  };
}


// Reducer

const initialState = {

};

export const testRunDiff = handleActions({

}, initialState);
