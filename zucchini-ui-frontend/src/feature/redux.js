import { handleActions } from "redux-actions";

import * as model from "./model";

import { getTestRun } from "../testRun/redux";

// Actions

const PREFIX = "FEATURE";

const GET_FEATURE = `${PREFIX}/GET_FEATURE`;
const GET_FEATURE_FULFILLED = `${GET_FEATURE}_FULFILLED`;

const GET_FEATURE_STATS = `${PREFIX}/GET_FEATURE_STATS`;
const GET_FEATURE_STATS_FULFILLED = `${GET_FEATURE_STATS}_FULFILLED`;

const GET_FEATURE_HISTORY = `${PREFIX}/GET_FEATURE_HISTORY`;
const GET_FEATURE_HISTORY_FULFILLED = `${GET_FEATURE_HISTORY}_FULFILLED`;

const GET_SCENARIOS = `${PREFIX}/GET_SCENARIOS`;
const GET_SCENARIOS_FULFILLED = `${GET_SCENARIOS}_FULFILLED`;

const EDIT_FEATURE = `${PREFIX}/EDIT_FEATURE`;
const EDIT_FEATURE_PENDING = `${EDIT_FEATURE}_PENDING`;
const EDIT_FEATURE_REJECTED = `${EDIT_FEATURE}_REJECTED`;

const DELETE_FEATURE = `${PREFIX}/DELETE_FEATURE`;

// Action creators

export function loadFeaturePage({ featureId }) {
  return async (dispatch) => {
    // Load feature, stats, test run, scenarios

    const feature$ = dispatch(getFeature({ featureId }));
    const stats$ = dispatch(getFeatureStats({ featureId }));
    const history$ = dispatch(getFeatureHistory({ featureId }));
    const scenarios$ = dispatch(getScenarios({ featureId }));

    const featureResult = await feature$;
    const feature = featureResult.value; // Action promise contain results in a value field
    const testRun$ = dispatch(getTestRun({ testRunId: feature.testRunId }));

    await feature$;
    await stats$;
    await history$;
    await scenarios$;
    await testRun$;
  };
}

export function getFeature({ featureId }) {
  return {
    type: GET_FEATURE,
    payload: model.getFeature({ featureId }),
    meta: {
      featureId
    }
  };
}

export function getFeatureStats({ featureId }) {
  return {
    type: GET_FEATURE_STATS,
    payload: model.getFeatureStats({ featureId }),
    meta: {
      featureId
    }
  };
}

export function getFeatureHistory({ featureId }) {
  return {
    type: GET_FEATURE_HISTORY,
    payload: model.getFeatureHistory({ featureId }),
    meta: {
      featureId
    }
  };
}

export function getScenarios({ featureId }) {
  return {
    type: GET_SCENARIOS,
    payload: model.getScenarios({ featureId }),
    meta: {
      featureId
    }
  };
}

export function editFeatureState({ featureId, group }) {
  return (dispatch, getState) => {
    const previousGroup = getState().feature.feature.group;

    return dispatch({
      type: EDIT_FEATURE,
      payload: model.editFeatureState({ featureId, group }),
      meta: {
        featureId,
        group,
        previousGroup
      }
    });
  };
}

export function deleteFeature({ featureId }) {
  return {
    type: DELETE_FEATURE,
    payload: model.deleteFeature({ featureId }),
    meta: {
      featureId
    }
  };
}

// Reducer

const initialState = {
  feature: {
    info: {},
    location: {},
    tags: []
  },
  stats: model.createStatsWithZeros(),
  history: [],
  scenarios: []
};

export const feature = handleActions(
  {
    [GET_FEATURE_FULFILLED]: (state, action) => ({
      ...state,
      feature: action.payload
    }),

    [GET_FEATURE_STATS_FULFILLED]: (state, action) => ({
      ...state,
      stats: action.payload
    }),

    [GET_FEATURE_HISTORY_FULFILLED]: (state, action) => ({
      ...state,
      history: action.payload
    }),

    [GET_SCENARIOS_FULFILLED]: (state, action) => ({
      ...state,
      scenarios: action.payload
    }),

    [EDIT_FEATURE_PENDING]: (state, action) => ({
      ...state,
      feature: {
        ...state.feature,
        group: action.meta.group
      }
    }),

    [EDIT_FEATURE_REJECTED]: (state, action) => ({
      ...state,
      feature: {
        ...state.feature,
        group: action.meta.previousGroup
      }
    })
  },
  initialState
);
