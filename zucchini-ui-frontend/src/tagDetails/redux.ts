import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { default as scenariosApi } from "../api/scenarios";
import { default as featuresApi } from "../api/features";
import { createStatsWithZeros } from "../testRun/model";
import { getTestRun } from "../testRun/redux";

const PREFIX = "TAG_DETAILS";

type TagDetailsArgs = {
  testRunId: string;
  tags?: string;
  excludedTags?: string;
};

export function loadTagDetailsPage({ testRunId, tags, excludedTags }: TagDetailsArgs) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const scenariosResult = dispatch(getScenarios({ testRunId, tags, excludedTags }));
    const featuresResult = dispatch(getFeatures({ testRunId, tags, excludedTags }));
    const stats = dispatch(getStats({ testRunId, tags, excludedTags }));

    await Promise.all([testRunResult, scenariosResult, featuresResult, stats].map((result) => result.unwrap()));

    return null;
  };
}

export const getScenarios = createAsyncThunk(
  `${PREFIX}/LOAD_SCENARIOS`,
  ({ testRunId, tags, excludedTags }: TagDetailsArgs) => {
    return scenariosApi.getScenarios({ testRunId, tags, excludedTags });
  }
);

export const getFeatures = createAsyncThunk(
  `${PREFIX}/LOAD_FEATURES`,
  ({ testRunId, tags, excludedTags }: TagDetailsArgs) => {
    return featuresApi.getFeatures({ testRunId, tags, excludedTags, withStats: true });
  }
);

export const getStats = createAsyncThunk(
  `${PREFIX}/LOAD_STATS`,
  ({ testRunId, tags, excludedTags }: TagDetailsArgs) => {
    return scenariosApi.getStats({ testRunId, tags, excludedTags });
  }
);

const initialState = {
  scenarios: [],
  features: [],
  stats: createStatsWithZeros()
};

const tagDetailsSlice = createSlice({
  name: "tagDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScenarios.fulfilled, (state, action) => {
        state.scenarios = action.payload;
      })
      .addCase(getFeatures.fulfilled, (state, action) => {
        state.features = action.payload;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  }
});

export const tagDetails = tagDetailsSlice.reducer;
