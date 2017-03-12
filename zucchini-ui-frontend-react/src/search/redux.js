import { push } from 'react-router-redux';
// import { handleActions } from 'redux-actions';

import { getTestRun } from '../testRun/redux';


// Actions

// const PREFIX = 'TEST_RUN_SEARCH';


// Action creators

export function loadTestRunSearchPage({ testRunId }) {
  return dispatch => {
    // Load test run
    const testRun$ = dispatch(getTestRun({ testRunId }));

    // Merge results in a promise
    return Promise.all([testRun$]).then(() => null);
  };
}

export function search({ search, testRunId }) {
  return push({
    pathname: `/test-runs/${testRunId}/search`,
    query: {
      search,
    },
  });
}


// Reducer

/*
const initialState = {};

export const testRun = handleActions({

}, initialState);
*/
