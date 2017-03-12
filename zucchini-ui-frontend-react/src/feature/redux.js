import { handleActions } from 'redux-actions';

import * as model from './model'

import { getTestRun } from '../testRun/redux';


// Actions

const PREFIX = 'FEATURE';

const GET_FEATURE = `${PREFIX}/GET_FEATURE`;
const GET_FEATURE_FULFILED = `${GET_FEATURE}_FULFILLED`;

const GET_FEATURE_STATS = `${PREFIX}/GET_FEATURE_STATS`;
const GET_FEATURE_STATS_FULFILED = `${GET_FEATURE_STATS}_FULFILLED`;


// Action creators

export function loadFeaturePage({ featureId }) {
  return dispatch => {
    // Load feature, stats, test run

    const feature$ = dispatch(getFeature({ featureId }));
    const stats$ = dispatch(getFeatureStats({ featureId }));

    const testRun$ = feature$.then(result => {
      const feature = result.value; // Action promise contain results in a value field
      return dispatch(getTestRun({ testRunId: feature.testRunId }));
    });

    return Promise.all([feature$, testRun$, stats$]);
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


// Reducer

const initialState = {
  feature: {
    info: {},
    location: {},
  },
  stats: model.createStatsWithZeros(),
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

}, initialState);
