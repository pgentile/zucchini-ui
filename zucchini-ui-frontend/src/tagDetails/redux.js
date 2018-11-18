import { handleActions } from "redux-actions";

import { default as scenariosApi } from "../api/scenarios";
import { default as featuresApi } from "../api/features";
import { createStatsWithZeros } from "../testRun/model";
import { getTestRun } from "../testRun/redux";

// Actions

const PREFIX = "TAG_DETAILS";

const LOAD_SCENARIOS = `${PREFIX}/LOAD_SCENARIOS`;
const LOAD_SCENARIOS_FULFILLED = `${LOAD_SCENARIOS}_FULFILLED`;

const LOAD_FEATURES = `${PREFIX}/LOAD_FEATURES`;
const LOAD_FEATURES_FULFILLED = `${LOAD_FEATURES}_FULFILLED`;

const LOAD_STATS = `${PREFIX}/LOAD_STATS`;
const LOAD_STATS_FULFILLED = `${LOAD_STATS}_FULFILLED`;

// Action creators

export function loadTagDetailsPage({ testRunId, tags, excludedTags }) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const scenariosResult$ = dispatch(getScenarios({ testRunId, tags, excludedTags }));
    const featuresResult$ = dispatch(getFeatures({ testRunId, tags, excludedTags }));
    const stats$ = dispatch(getStats({ testRunId, tags, excludedTags }));

    await testRunResult$;
    await scenariosResult$;
    await featuresResult$;
    await stats$;

    return null;
  };
}

export function getScenarios({ testRunId, tags, excludedTags }) {
  return {
    type: LOAD_SCENARIOS,
    payload: scenariosApi.getScenarios({ testRunId, tags, excludedTags })
  };
}

export function getFeatures({ testRunId, tags, excludedTags }) {
  return {
    type: LOAD_FEATURES,
    payload: featuresApi.getFeatures({ testRunId, tags, excludedTags, withStats: true })
  };
}

export function getStats({ testRunId, tags, excludedTags }) {
  return {
    type: LOAD_STATS,
    payload: scenariosApi.getStats({ testRunId, tags, excludedTags })
  };
}

// Reducer

const initialState = {
  scenarios: [],
  features: [],
  stats: createStatsWithZeros()
};

export const tagDetails = handleActions(
  {
    [LOAD_SCENARIOS_FULFILLED]: (state, action) => ({
      ...state,
      scenarios: action.payload
    }),

    [LOAD_FEATURES_FULFILLED]: (state, action) => ({
      ...state,
      features: action.payload
    }),

    [LOAD_STATS_FULFILLED]: (state, action) => ({
      ...state,
      stats: action.payload
    })
  },
  initialState
);
