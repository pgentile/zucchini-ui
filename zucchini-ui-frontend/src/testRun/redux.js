import { handleActions } from 'redux-actions';
import { replace } from 'react-router-redux'

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

const DELETE_TEST_RUN = `${PREFIX}/DELETE_TEST_RUN`;

const IMPORT_CUCUMBER_RESULTS = `${PREFIX}/IMPORT_CUCUMBER_RESULTS`;

const EDIT_TEST_RUN = `${PREFIX}/EDIT_TEST_RUN`;


// Action creators

export function loadTestRunPage({ testRunId }) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const statsResult$ = dispatch(getTestRunStats({ testRunId }));
    const featuresResult$ = dispatch(getFeatures({ testRunId }));

    const testRunResult = await testRunResult$;
    const testRunType = testRunResult.value.type;
    const historyResult$ = dispatch(getTestRunHistoryByType({ testRunId, testRunType }));

    await testRunResult$;
    await statsResult$;
    await historyResult$;
    await featuresResult$;

    return null;
  };
}

export function getTestRun({ testRunId }) {
  return {
    type: GET_TEST_RUN,
    payload: model.getTestRun({ testRunId }),
    meta: {
      testRunId,
    },
  };
}

export function getTestRunStats({ testRunId }) {
  return {
    type: GET_TEST_RUN_STATS,
    payload: model.getTestRunStats({ testRunId }),
    meta: {
      testRunId,
    },
  };
}

export function getTestRunHistoryByType({ testRunId, testRunType }) {
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

export function deleteTestRun({ testRunId }) {
  return {
    type: DELETE_TEST_RUN,
    payload: model.deleteTestRun({ testRunId }),
    meta: {
      testRunId,
    },
  };
}

export function deleteTestRunThenRedirect({ testRunId }) {
  return dispatch => {
    const deleteTestRun$ = dispatch(deleteTestRun({ testRunId }));

    deleteTestRun$.then(dispatch(replace('/')));
  };
}

export function importCucumberResult({ testRunId, file, ...options }) {
  return {
    type: IMPORT_CUCUMBER_RESULTS,
    payload: model.importCucumberResult({ testRunId, file, ...options }),
    meta: {
      testRunId,
    },
  };
}

export function importCucumberResultThenReload({ testRunId, file, ...options }) {
  return dispatch => {
    const import$ = dispatch(importCucumberResult({ testRunId, file, ...options }));

    return import$.then(() => dispatch(loadTestRunPage({ testRunId })));
  };
}

export function editTestRun({ testRunId, type, labels }) {
  return {
    type: EDIT_TEST_RUN,
    payload: model.editTestRun({ testRunId, type, labels }),
    meta: {
      testRunId,
    },
  };
}

export function editTestRunThenReload({ testRunId, type, labels }) {
  return dispatch => {
    const editTestRun$ = dispatch(editTestRun({ testRunId, type, labels }));

    return editTestRun$.then(() => dispatch(loadTestRunPage({ testRunId })));
  };
}


// Reducer

const initialState = {
  testRun: {
    labels: [],
  },
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
