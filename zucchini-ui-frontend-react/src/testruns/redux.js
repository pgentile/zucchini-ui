import { LOCATION_CHANGE } from 'react-router-redux';

import { default as testRunApi } from '../api/testRuns';


const PREFIX = 'TEST_RUNS';

const GET_LATEST_TEST_RUNS = `${PREFIX}/GET_LATEST_TEST_RUNS`;
const GET_LATEST_TEST_RUNS_FULFILLED = `${GET_LATEST_TEST_RUNS}_FULFILLED`;

const GET_LATEST_TEST_RUNS_WITH_STATS = `${PREFIX}/GET_LATEST_TEST_RUNS_WITH_STATS`;
const GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED = `${GET_LATEST_TEST_RUNS_WITH_STATS}_FULFILLED`;


export function getLatestTestRuns() {
  return dispatch => {
    const latestTestRuns = dispatch({
      type: GET_LATEST_TEST_RUNS,
      payload: getLatestsTestRuns(),
    });

    latestTestRuns.then(() => {
      dispatch({
        type: GET_LATEST_TEST_RUNS_WITH_STATS,
        payload: getLatestsTestRunsWithStats(),
      });
    });
  };
}


function getLatestsTestRuns() {
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


function getLatestsTestRunsWithStats() {
  return testRunApi.getLatests({ withStats: true });
}


const initialState = {
  testRuns: [],
  selectedType: null,
};

export function testRuns(state = initialState, action) {
  switch (action.type) {

  case LOCATION_CHANGE:
    if (action.payload.pathname !== '/') {
      return state;
    }

    return {
      ...state,
      selectedType: action.payload.query.type,
    };

  case GET_LATEST_TEST_RUNS_FULFILLED:
  case GET_LATEST_TEST_RUNS_WITH_STATS_FULFILLED:
    return {
      ...state,
      testRuns: action.payload,
    };

  default:
    return state;
  }
}
