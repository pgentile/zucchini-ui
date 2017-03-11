import { LOCATION_CHANGE } from 'react-router-redux';

import { default as testRunApi } from '../api/testRuns';


const PREFIX = 'TEST_RUNS';

const GET_LATEST_TEST_RUNS = `${PREFIX}/GET_LATEST_TEST_RUNS`;
const GET_LATEST_TEST_RUNS_FULFILLED = `${GET_LATEST_TEST_RUNS}_FULFILLED`;
// const GET_LATEST_TEST_RUNS_REJECTED = `$${GET_LATEST_TEST_RUNS}_REJECTED`;


export function getLatestTestRuns() {
  return {
    type: GET_LATEST_TEST_RUNS,
    payload: testRunApi.getLatests({ withStats: true }),
  };
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
    return {
      ...state,
      testRuns: action.payload,
    };

  default:
    return state;
  }
}
