import { handleActions } from "redux-actions";

import featureFiltersStorage from "./featureFiltersStorage";
import statsDashboardFiltersStorage from "./statsDashboardFiltersStorage";
import historyFiltersStorage from "./historyFiltersStorage";
import scenarioFiltersStorage from "./scenarioFiltersStorage";
import stepFiltersStorage from "./stepFiltersStorage";

// Actions

const PREFIX = "FILTERS";

const UPDATE_FEATURE_FILTERS = `${PREFIX}/UPDATE_FEATURE_FILTERS`;
const UPDATE_STATS_DASHBOARD_FILTERS = `${PREFIX}/UPDATE_STATS_DASHBOARD_FILTERS`;
const UPDATE_HISTORY_FILTERS = `${PREFIX}/UPDATE_HISTORY_FILTERS`;
const UPDATE_SCENARIO_FILTERS = `${PREFIX}/UPDATE_SCENARIO_FILTERS`;
const UPDATE_STEP_FILTERS = `${PREFIX}/UPDATE_STEP_FILTERS`;
const TOGGLE_STEP_FILTER = `${PREFIX}/TOGGLE_STEP_FILTER`;

export function updateFeatureFilters(filters) {
  return {
    type: UPDATE_FEATURE_FILTERS,
    payload: filters
  };
}

export function updateStatsDashboardFilters(filters) {
  return {
    type: UPDATE_STATS_DASHBOARD_FILTERS,
    payload: filters
  };
}

export function updateHistoryFilters(filters) {
  return {
    type: UPDATE_HISTORY_FILTERS,
    payload: filters
  };
}

export function updateScenarioFilters(filters) {
  return {
    type: UPDATE_SCENARIO_FILTERS,
    payload: filters
  };
}

export function toggleStepFilter(filterName) {
  return {
    type: TOGGLE_STEP_FILTER,
    payload: { filterName }
  };
}

export function resetStepFilters() {
  return (dispatch, getState) => {
    const newFilters = {};

    const keys = Object.keys(getState().stepFilters);
    keys.forEach((key) => {
      newFilters[key] = true;
    });

    dispatch({
      type: UPDATE_STEP_FILTERS,
      payload: newFilters
    });
  };
}

export const featureFilters = handleActions(
  {
    [UPDATE_FEATURE_FILTERS]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  featureFiltersStorage.read()
);

export const statsDashboardFilters = handleActions(
  {
    [UPDATE_STATS_DASHBOARD_FILTERS]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  statsDashboardFiltersStorage.read()
);

export const historyFilters = handleActions(
  {
    [UPDATE_HISTORY_FILTERS]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  historyFiltersStorage.read()
);

export const scenarioFilters = handleActions(
  {
    [UPDATE_SCENARIO_FILTERS]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  scenarioFiltersStorage.read()
);

export const stepFilters = handleActions(
  {
    [UPDATE_STEP_FILTERS]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [TOGGLE_STEP_FILTER]: (state, action) => {
      const { filterName } = action.payload;
      return {
        ...state,
        [filterName]: !state[filterName]
      };
    }
  },
  stepFiltersStorage.read()
);
