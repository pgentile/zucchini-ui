import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as model from "./model";
import { getTestRun, getTestRunStats } from "../testRun/redux";

const PREFIX = "FAILURES";

export function loadTestRunFailuresPage({ testRunId }: { testRunId: string }) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const failuresResult = dispatch(getTestRunFailures({ testRunId }));
    const stats = dispatch(getTestRunStats({ testRunId }));

    await Promise.all([testRunResult, failuresResult, stats].map((result) => result.unwrap()));
    return null;
  };
}

export const getTestRunFailures = createAsyncThunk(`${PREFIX}/GET_FAILURES`, ({ testRunId }: { testRunId: string }) => {
  return model.getTestRunFailures({ testRunId });
});

const initialState = {
  failures: []
};

const failuresSlice = createSlice({
  name: "failures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTestRunFailures.fulfilled, (state, action) => {
      state.failures = action.payload;
    });
  }
});

export const failures = failuresSlice.reducer;
