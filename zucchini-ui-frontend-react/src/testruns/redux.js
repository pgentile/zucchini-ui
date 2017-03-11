import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';

import * as model from './model'


const PREFIX = 'TEST_RUNS';

const GET_LATEST_TEST_RUNS = `${PREFIX}/GET_LATEST_TEST_RUNS`;
const GET_LATEST_TEST_RUNS_FULFILLED = `${GET_LATEST_TEST_RUNS}_FULFILLED`;

const GET_LATEST_TEST_RUNS_WITH_STATS = `${PREFIX}/GET_LATEST_TEST_RUNS_WITH_STATS`;
const GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED = `${GET_LATEST_TEST_RUNS_WITH_STATS}_FULFILLED`;


export function getLatestTestRuns() {
  return dispatch => {
    const latestTestRuns = dispatch({
      type: GET_LATEST_TEST_RUNS,
      payload: model.getLatestsTestRuns(),
    });

    latestTestRuns.then(() => {
      dispatch({
        type: GET_LATEST_TEST_RUNS_WITH_STATS,
        payload: model.getLatestsTestRunsWithStats(),
      });
    });
  };
}


const initialState = {
  testRuns: [],
  selectedType: null,
};

export const testRuns = handleActions({

  [LOCATION_CHANGE]: (state, action) => {
    if (action.payload.pathname !== '/') {
      return state;
    }

    return {
      ...state,
      selectedType: action.payload.query.type,
    };
  },

  [GET_LATEST_TEST_RUNS_FULFILLED]: (state, action) => ({
    ...state,
    testRuns: action.payload,
  }),

  [GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED]: (state, action) => ({
    ...state,
    testRuns: action.payload,
  }),

}, initialState);
