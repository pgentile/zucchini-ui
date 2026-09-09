import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as model from "./model";
import { getTestRun } from "../testRun/redux";

const PREFIX = "STEP_DEFINITIONS";

export function loadTestRunStepDefinitionsPage({ testRunId }: { testRunId: string }) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const stepDefinitionsResult = dispatch(getTestRunStepDefinitions({ testRunId }));

    await Promise.all([testRunResult, stepDefinitionsResult].map((result) => result.unwrap()));
    return null;
  };
}

export const getTestRunStepDefinitions = createAsyncThunk(
  `${PREFIX}/GET_STEP_DEFINITIONS`,
  ({ testRunId }: { testRunId: string }) => {
    return model.getStepDefinitions({ testRunId });
  }
);

const initialState = {
  stepDefinitions: []
};

const stepDefinitionsSlice = createSlice({
  name: "stepDefinitions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTestRunStepDefinitions.fulfilled, (state, action) => {
      state.stepDefinitions = action.payload;
    });
  }
});

export const stepDefinitions = stepDefinitionsSlice.reducer;
