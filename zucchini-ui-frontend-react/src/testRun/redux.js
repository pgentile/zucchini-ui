import { handleActions } from 'redux-actions';

import * as model from './model'


// Actions

const PREFIX = 'TEST_RUN';

const GET_TEST_RUN = `${PREFIX}/GET_TEST_RUN`;
const GET_TEST_RUN_FULFILLED = `${GET_TEST_RUN}_FULFILLED`;
const GET_TEST_RUN_PENDING = `${GET_TEST_RUN}_PENDING`;

const GET_TEST_RUN_STATS = `${PREFIX}/GET_TEST_RUN_STATS`;
const GET_TEST_RUN_STATS_FULFILLED = `${GET_TEST_RUN_STATS}_FULFILLED`;
const GET_TEST_RUN_STATS_PENDING = `${GET_TEST_RUN_STATS}_PENDING`;


// Action creators

export function getTestRun({ testRunId }) {
  return dispatch => {
    dispatch({
      type: GET_TEST_RUN,
      payload: model.getTestRun({ testRunId }),
      meta: {
        testRunId,
      },
    });

    dispatch({
      type: GET_TEST_RUN_STATS,
      payload: model.getTestRunStats({ testRunId }),
      meta: {
        testRunId,
      },
    });
  };
}


// Reducer

const initialState = {
  testRun: {},
  stats: model.createStatsWithZeros(),
};

export const testRun = handleActions({

  [GET_TEST_RUN_PENDING]: (state, action) => {
    // Same ID ? Erase is not defined then.
    if (state.testRun.id === action.meta.testRunId) {
      return state;
    }

    return {
      ...state,
      testRun: {},
    };
  },

  [GET_TEST_RUN_STATS_PENDING]: (state, action) => {
    // Same ID ? Erase is not defined then.
    if (state.testRun.id === action.meta.testRunId) {
      return state;
    }

    return {
      ...state,
      stats: model.createStatsWithZeros(),
    };
  },

  [GET_TEST_RUN_FULFILLED]: (state, action) => ({
    ...state,
    testRun: action.payload,
  }),

  [GET_TEST_RUN_STATS_FULFILLED]: (state, action) => ({
    ...state,
    stats: action.payload,
  }),

}, initialState);
