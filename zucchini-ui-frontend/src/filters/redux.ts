import { createSlice } from "@reduxjs/toolkit";

import featureFiltersStorage from "./featureFiltersStorage";
import statsDashboardFiltersStorage from "./statsDashboardFiltersStorage";
import historyFiltersStorage from "./historyFiltersStorage";
import scenarioFiltersStorage from "./scenarioFiltersStorage";
import stepFiltersStorage from "./stepFiltersStorage";

type FiltersState = Record<string, boolean>;

const featureFiltersSlice = createSlice({
  name: "featureFilters",
  initialState: featureFiltersStorage.read() as FiltersState,
  reducers: {
    updateFeatureFilters: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

const statsDashboardFiltersSlice = createSlice({
  name: "statsDashboardFilters",
  initialState: statsDashboardFiltersStorage.read() as FiltersState,
  reducers: {
    updateStatsDashboardFilters: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

const historyFiltersSlice = createSlice({
  name: "historyFilters",
  initialState: historyFiltersStorage.read() as FiltersState,
  reducers: {
    updateHistoryFilters: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

const scenarioFiltersSlice = createSlice({
  name: "scenarioFilters",
  initialState: scenarioFiltersStorage.read() as FiltersState,
  reducers: {
    updateScenarioFilters: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

const stepFiltersSlice = createSlice({
  name: "stepFilters",
  initialState: stepFiltersStorage.read() as FiltersState,
  reducers: {
    updateStepFilters: (state, action) => ({
      ...state,
      ...action.payload
    }),
    toggleStepFilter: (state, action) => {
      state[action.payload] = !state[action.payload];
    }
  }
});

export const { updateFeatureFilters } = featureFiltersSlice.actions;
export const { updateStatsDashboardFilters } = statsDashboardFiltersSlice.actions;
export const { updateHistoryFilters } = historyFiltersSlice.actions;
export const { updateScenarioFilters } = scenarioFiltersSlice.actions;
export const { toggleStepFilter, updateStepFilters } = stepFiltersSlice.actions;

export function resetStepFilters() {
  return (dispatch, getState) => {
    const newFilters = {};

    const keys = Object.keys(getState().stepFilters);
    keys.forEach((key) => {
      newFilters[key] = true;
    });

    dispatch(updateStepFilters(newFilters));
  };
}

export const featureFilters = featureFiltersSlice.reducer;
export const statsDashboardFilters = statsDashboardFiltersSlice.reducer;
export const historyFilters = historyFiltersSlice.reducer;
export const scenarioFilters = scenarioFiltersSlice.reducer;
export const stepFilters = stepFiltersSlice.reducer;
