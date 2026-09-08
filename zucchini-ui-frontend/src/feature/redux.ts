import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as model from "./model";
import { getTestRun } from "../testRun/redux";

const PREFIX = "FEATURE";

type FeatureState = {
  feature: {
    group?: string;
    info: Record<string, unknown>;
    location: Record<string, unknown>;
    tags: unknown[];
    [key: string]: unknown;
  };
  stats: unknown;
  history: unknown[];
  scenarios: unknown[];
  previousGroup?: string;
};

export function loadFeaturePage({ featureId }: { featureId: string }) {
  return async (dispatch) => {
    const featureResult = dispatch(getFeature({ featureId }));
    const statsResult = dispatch(getFeatureStats({ featureId }));
    const historyResult = dispatch(getFeatureHistory({ featureId }));
    const scenariosResult = dispatch(getScenarios({ featureId }));

    const loadedFeature = await featureResult.unwrap();
    const testRunResult = dispatch(getTestRun({ testRunId: loadedFeature.testRunId }));

    await Promise.all([statsResult, historyResult, scenariosResult, testRunResult].map((result) => result.unwrap()));
  };
}

export const getFeature = createAsyncThunk(`${PREFIX}/GET_FEATURE`, ({ featureId }: { featureId: string }) => {
  return model.getFeature({ featureId });
});

export const getFeatureStats = createAsyncThunk(
  `${PREFIX}/GET_FEATURE_STATS`,
  ({ featureId }: { featureId: string }) => {
    return model.getFeatureStats({ featureId });
  }
);

export const getFeatureHistory = createAsyncThunk(
  `${PREFIX}/GET_FEATURE_HISTORY`,
  ({ featureId }: { featureId: string }) => {
    return model.getFeatureHistory({ featureId });
  }
);

export const getScenarios = createAsyncThunk(`${PREFIX}/GET_SCENARIOS`, ({ featureId }: { featureId: string }) => {
  return model.getScenarios({ featureId });
});

export const editFeatureState = createAsyncThunk(
  `${PREFIX}/EDIT_FEATURE`,
  ({ featureId, group }: { featureId: string; group: string }) => {
    return model.editFeatureState({ featureId, group });
  }
);

export const deleteFeature = createAsyncThunk(`${PREFIX}/DELETE_FEATURE`, ({ featureId }: { featureId: string }) => {
  return model.deleteFeature({ featureId });
});

const initialState: FeatureState = {
  feature: {
    info: {},
    location: {},
    tags: []
  },
  stats: model.createStatsWithZeros(),
  history: [],
  scenarios: []
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeature.fulfilled, (state, action) => {
        state.feature = action.payload;
      })
      .addCase(getFeatureStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getFeatureHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(getScenarios.fulfilled, (state, action) => {
        state.scenarios = action.payload;
      })
      .addCase(editFeatureState.pending, (state, action) => {
        state.previousGroup = state.feature.group;
        state.feature.group = action.meta.arg.group;
      })
      .addCase(editFeatureState.fulfilled, (state) => {
        delete state.previousGroup;
      })
      .addCase(editFeatureState.rejected, (state) => {
        state.feature.group = state.previousGroup;
        delete state.previousGroup;
      });
  }
});

export const feature = featureSlice.reducer;
