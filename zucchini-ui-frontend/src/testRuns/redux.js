import { handleActions } from "redux-actions";

import * as model from "./model";

// Actions

const PREFIX = "TEST_RUNS";

const GET_LATEST_TEST_RUNS = `${PREFIX}/GET_LATEST_TEST_RUNS`;
const GET_LATEST_TEST_RUNS_FULFILLED = `${GET_LATEST_TEST_RUNS}_FULFILLED`;

const GET_LATEST_TEST_RUNS_WITH_STATS = `${PREFIX}/GET_LATEST_TEST_RUNS_WITH_STATS`;
const GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED = `${GET_LATEST_TEST_RUNS_WITH_STATS}_FULFILLED`;

const CREATE_TEST_RUN = `${PREFIX}/CREATE_TEST_RUN`;
const CREATE_TEST_RUN_FULFILLED = `${CREATE_TEST_RUN}_FULFILLED`;

const DELETE_MANY_TEST_RUNS = `${PREFIX}/DELETE_MANY_TEST_RUNS`;
const DELETE_MANY_TEST_RUNS_FULFILLED = `${DELETE_MANY_TEST_RUNS}_FULFILLED`;

// Action creators

export function loadTestRunsPage() {
  return async (dispatch) => {
    const latestTestRunsResult$ = dispatch(getLatestTestRuns());
    const latestTestRunsResultWithStats$ = dispatch(getLatestTestRunsWithStats());
    await latestTestRunsResult$;
    await latestTestRunsResultWithStats$;
    return null;
  };
}

export function getLatestTestRuns() {
  return {
    type: GET_LATEST_TEST_RUNS,
    payload: model.getLatestsTestRuns()
  };
}

export function getLatestTestRunsWithStats() {
  return {
    type: GET_LATEST_TEST_RUNS_WITH_STATS,
    payload: model.getLatestsTestRunsWithStats()
  };
}

export function createTestRun({ type, environment, name, labels }) {
  return {
    type: CREATE_TEST_RUN,
    payload: model.createTestRun({ type, environment, name, labels })
  };
}

export function purgeTestRuns({ testRunIds }) {
  return {
    type: DELETE_MANY_TEST_RUNS,
    payload: model.deleteManyTestRuns({ testRunIds }),
    meta: {
      testRunIds
    }
  };
}

// Reducer

const initialState = {
  testRuns: []
};

export const testRuns = handleActions(
  {
    [GET_LATEST_TEST_RUNS_FULFILLED]: (state, action) => {
      return {
        ...state,
        testRuns: mergeTestRuns(state.testRuns, action.payload)
      };
    },

    [GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED]: (state, action) => {
      return {
        ...state,
        testRuns: mergeTestRuns(state.testRuns, action.payload)
      };
    },

    [CREATE_TEST_RUN_FULFILLED]: (state, action) => {
      return {
        ...state,
        testRuns: [action.payload, ...state.testRuns]
      };
    },

    [DELETE_MANY_TEST_RUNS_FULFILLED]: (state, action) => {
      const { testRunIds } = action.meta;
      const testRunIdsSet = new Set(testRunIds);
      return {
        ...state,
        testRuns: state.testRuns.filter((testRun) => !testRunIdsSet.has(testRun.id))
      };
    }
  },
  initialState
);

function mergeTestRuns(testRuns, nextTestRuns) {
  const testRunsById = new Map();
  testRuns.forEach((testRun) => {
    testRunsById.set(testRun.id, testRun);
  });

  return nextTestRuns.map((nextTestRun) => {
    const testRun = testRunsById.get(nextTestRun.id);
    return {
      ...testRun,
      ...nextTestRun
    };
  });
}
