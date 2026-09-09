import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { default as testRunsApi } from "../api/testRuns";
import { getLatestTestRuns, getLatestTestRunsWithStats } from "../testRuns/redux";
import { getTestRun } from "../testRun/redux";

const PREFIX = "TEST_RUN_DIFF";

export function loadTestRunDiffSelectorPage({ testRunId }: { testRunId: string }) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const latestTestRunsResult = dispatch(getLatestTestRuns());
    const latestTestRunsWithStatsResult = dispatch(getLatestTestRunsWithStats());

    await Promise.all(
      [testRunResult, latestTestRunsResult, latestTestRunsWithStatsResult].map((result) => result.unwrap())
    );

    return null;
  };
}

export function loadTestRunDiffResultPage({
  testRunId,
  otherTestRunId
}: {
  testRunId: string;
  otherTestRunId: string;
}) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const otherTestRunResult = dispatch(getOtherTestRun({ testRunId: otherTestRunId }));
    const diffResult = dispatch(getDiff({ testRunId, otherTestRunId }));

    await Promise.all([testRunResult, otherTestRunResult, diffResult].map((result) => result.unwrap()));

    return null;
  };
}

export const getOtherTestRun = createAsyncThunk(
  `${PREFIX}/GET_OTHER_TEST_RUN`,
  ({ testRunId }: { testRunId: string }) => {
    return testRunsApi.getTestRun({ testRunId });
  }
);

export const getDiff = createAsyncThunk(
  `${PREFIX}/GET_TEST_RUN_DIFF`,
  ({ testRunId, otherTestRunId }: { testRunId: string; otherTestRunId: string }) => {
    return testRunsApi.getTestRunDiff({ testRunId, otherTestRunId });
  }
);

const initialState = {
  otherTestRun: {},
  diff: {
    deletedScenarii: [],
    differentScenarii: [],
    newScenarii: []
  }
};

const testRunDiffSlice = createSlice({
  name: "testRunDiff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOtherTestRun.fulfilled, (state, action) => {
        state.otherTestRun = action.payload;
      })
      .addCase(getDiff.fulfilled, (state, action) => {
        state.diff = action.payload;
      });
  }
});

export const testRunDiff = testRunDiffSlice.reducer;
