import { handleActions } from "redux-actions";

import { default as testRunsApi } from "../api/testRuns";
import { getLatestTestRuns, getLatestTestRunsWithStats } from "../testRuns/redux";
import { getTestRun } from "../testRun/redux";

// Actions

const PREFIX = "TEST_RUN_DIFF";

const GET_OTHER_TEST_RUN = `${PREFIX}/GET_OTHER_TEST_RUN`;
const GET_OTHER_TEST_RUN_FULFILLED = `${GET_OTHER_TEST_RUN}_FULFILLED`;

const GET_TEST_RUN_DIFF = `${PREFIX}/GET_TEST_RUN_DIFF`;
const GET_TEST_RUN_DIFF_FULFILLED = `${GET_TEST_RUN_DIFF}_FULFILLED`;

// Action creators

export function loadTestRunDiffSelectorPage({ testRunId }) {
  return async (dispatch) => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const latestTestRunsResult$ = dispatch(getLatestTestRuns());
    const latestTestRunsWithStatsResult$ = dispatch(getLatestTestRunsWithStats());

    await testRunResult$;
    await latestTestRunsResult$;
    await latestTestRunsWithStatsResult$;

    return null;
  };
}

export function loadTestRunDiffResultPage({ testRunId, otherTestRunId }) {
  return async (dispatch) => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const otherTestRunResult$ = dispatch(getOtherTestRun({ testRunId: otherTestRunId }));
    const diffResult$ = dispatch(getDiff({ testRunId, otherTestRunId }));

    await testRunResult$;
    await otherTestRunResult$;
    await diffResult$;

    return null;
  };
}

export function getOtherTestRun({ testRunId }) {
  return {
    type: GET_OTHER_TEST_RUN,
    payload: testRunsApi.getTestRun({ testRunId })
  };
}

export function getDiff({ testRunId, otherTestRunId }) {
  return {
    type: GET_TEST_RUN_DIFF,
    payload: testRunsApi.getTestRunDiff({ testRunId, otherTestRunId })
  };
}

// Reducer

const initialState = {
  otherTestRun: {},
  diff: {
    deletedScenarii: [],
    differentScenarii: [],
    newScenarii: []
  }
};

export const testRunDiff = handleActions(
  {
    [GET_OTHER_TEST_RUN_FULFILLED]: (state, action) => {
      return {
        ...state,
        otherTestRun: action.payload
      };
    },

    [GET_TEST_RUN_DIFF_FULFILLED]: (state, action) => {
      return {
        ...state,
        diff: action.payload
      };
    }
  },
  initialState
);
