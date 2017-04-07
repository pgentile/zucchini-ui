import { handleActions } from 'redux-actions';
import { replace } from 'react-router-redux'

import * as model from './model'

import { getTestRun } from '../testRun/redux';


// Actions

const PREFIX = 'FEATURE';

const GET_FEATURE = `${PREFIX}/GET_FEATURE`;
const GET_FEATURE_FULFILED = `${GET_FEATURE}_FULFILLED`;

const GET_FEATURE_STATS = `${PREFIX}/GET_FEATURE_STATS`;
const GET_FEATURE_STATS_FULFILED = `${GET_FEATURE_STATS}_FULFILLED`;

const GET_FEATURE_HISTORY = `${PREFIX}/GET_FEATURE_HISTORY`;
const GET_FEATURE_HISTORY_FULFILED = `${GET_FEATURE_HISTORY}_FULFILLED`;

const GET_SCENARIOS = `${PREFIX}/GET_SCENARIOS`;
const GET_SCENARIOS_FULFILED = `${GET_SCENARIOS}_FULFILLED`;

const DELETE_FEATURE = `${PREFIX}/DELETE_FEATURE`;


// Action creators

export function loadFeaturePage({ featureId }) {
  return dispatch => {
    // Load feature, stats, test run, scenarios

    const feature$ = dispatch(getFeature({ featureId }));
    const stats$ = dispatch(getFeatureStats({ featureId }));
    const history$ = dispatch(getFeatureHistory({ featureId }));
    const scenarios$ = dispatch(getScenarios({ featureId }));

    const testRun$ = feature$.then(result => {
      const feature = result.value; // Action promise contain results in a value field
      return dispatch(getTestRun({ testRunId: feature.testRunId }));
    });

    return Promise.all([feature$, testRun$, stats$, history$, scenarios$]).then(() => null);
  };
}

export function deleteFeatureThenRedirect({ featureId }) {
  return (dispatch, getState) => {
    const deleteFeature$ = dispatch(deleteFeature({ featureId }));

    const testRunId = getState().testRun.testRun.id;
    deleteFeature$.then(dispatch(replace(`/test-runs/${testRunId}`)));
  };
}

export function getFeature({ featureId }) {
  return {
    type: GET_FEATURE,
    payload: model.getFeature({ featureId }),
    meta: {
      featureId,
    },
  };
}

export function getFeatureStats({ featureId }) {
  return {
    type: GET_FEATURE_STATS,
    payload: model.getFeatureStats({ featureId }),
    meta: {
      featureId,
    },
  };
}

export function getFeatureHistory({ featureId }) {
  return {
    type: GET_FEATURE_HISTORY,
    payload: model.getFeatureHistory({ featureId }),
    meta: {
      featureId,
    },
  };
}

export function getScenarios({ featureId }) {
  return {
    type: GET_SCENARIOS,
    payload: model.getScenarios({ featureId }),
    meta: {
      featureId,
    },
  };
}

export function deleteFeature({ featureId }) {
  return {
    type: DELETE_FEATURE,
    payload: model.deleteFeature({ featureId }),
    meta: {
      featureId,
    },
  };
}

// Reducer

const initialState = {
  feature: {
    info: {},
    location: {},
    tags: [],
  },
  stats: model.createStatsWithZeros(),
  history: [],
  scenarios: [],
};

export const feature = handleActions({

  [GET_FEATURE_FULFILED]: (state, action) => ({
    ...state,
    feature: action.payload,
  }),

  [GET_FEATURE_STATS_FULFILED]: (state, action) => ({
    ...state,
    stats: action.payload,
  }),

  [GET_FEATURE_HISTORY_FULFILED]: (state, action) => ({
    ...state,
    history: action.payload,
  }),

  [GET_SCENARIOS_FULFILED]: (state, action) => ({
    ...state,
    scenarios: action.payload,
  }),

}, initialState);
