import { push } from 'react-router-redux';
import { handleActions } from 'redux-actions';

import { getTestRun } from '../testRun/redux';
import * as model from './model';


// Actions

const PREFIX = 'SEARCH';

const SEARCH = `${PREFIX}/SEARCH`;
const SEARCH_FULFILLED = `${SEARCH}_FULFILLED`;


// Action creators

export function loadTestRunSearchPage({ testRunId }) {
  return getTestRun({ testRunId });
}

export function search({ search, testRunId }) {
  return dispatch => {
    dispatch(push({
      pathname: `/test-runs/${testRunId}/search`,
      query: {
        search,
      },
    }));

    dispatch(searchScenarios({ search, testRunId }));
  };
}

function searchScenarios({ search, testRunId }) {
  return {
    type: SEARCH,
    payload: model.search({ search, testRunId }),
    meta: {
      testRunId,
    },
  };
}


// Reducer

const initialState = {
  foundScenarios: [],
};

export const searchResults = handleActions({
  [SEARCH_FULFILLED]: (state, action) => ({
    ...state,
    foundScenarios: action.payload,
  }),
}, initialState);
