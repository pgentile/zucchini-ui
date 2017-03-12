import { handleActions } from 'redux-actions';

import * as model from './model'


// Actions

const PREFIX = 'TEST_RUN';

const GET_TEST_RUN = `${PREFIX}/GET_TEST_RUN`;
const GET_TEST_RUN_FULFILLED = `${GET_TEST_RUN}_FULFILLED`;

const GET_TEST_RUN_STATS = `${PREFIX}/GET_TEST_RUN_STATS`;
const GET_TEST_RUN_STATS_FULFILLED = `${GET_TEST_RUN_STATS}_FULFILLED`;

const GET_TEST_RUN_HISTORY = `${PREFIX}/GET_TEST_RUN_HISTORY`;
const GET_TEST_RUN_HISTORY_FULFILLED = `${GET_TEST_RUN_HISTORY}_FULFILLED`;

const GET_FEATURES = `${PREFIX}/GET_FEATURES`;
const GET_FEATURES_FULFILLED = `${GET_FEATURES}_FULFILLED`;


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

export function getTestRunHistoryByType({ testRunType, testRunId }) {
  return {
    type: GET_TEST_RUN_HISTORY,
    payload: model.getTestRunHistoryByType({ type: testRunType }),
    meta: {
      testRunId,
    },
  };
}

export function getFeatures({ testRunId }) {
  return {
    type: GET_FEATURES,
    payload: model.getFeatures({ testRunId }),
    meta: {
      testRunId,
    },
  };
}


// Reducer

const initialState = {
  testRun: {},
  stats: model.createStatsWithZeros(),
  history: [],
  features: [],
};

export const testRun = handleActions({

  [GET_TEST_RUN_FULFILLED]: (state, action) => ({
    ...state,
    testRun: action.payload,
  }),

  [GET_TEST_RUN_STATS_FULFILLED]: (state, action) => {
    const stats = action.payload;

    // Refresh stats in history, if needed
    const history = state.history.map(testRun => {
      if (testRun.id === action.meta.testRunId) {
        return {
          ...testRun,
          stats,
        };
      }
      return testRun;
    });

    return {
      ...state,
      history,
      stats,
    }
  },

  [GET_TEST_RUN_HISTORY_FULFILLED]: (state, action) => ({
    ...state,
    history: action.payload,
  }),

  [GET_FEATURES_FULFILLED]: (state, action) => ({
    ...state,
    features: action.payload,
  }),

}, initialState);
