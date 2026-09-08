import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as model from "./model";

const PREFIX = "TEST_RUNS";

type TestRunRecord = {
  id?: string;
  [key: string]: unknown;
};

type CreateTestRunArgs = {
  type: string;
  environment: string;
  name: string;
  labels: unknown[];
};

export function loadTestRunsPage() {
  return async (dispatch) => {
    const latestTestRunsResult = dispatch(getLatestTestRuns());
    const latestTestRunsResultWithStats = dispatch(getLatestTestRunsWithStats());
    await Promise.all([latestTestRunsResult, latestTestRunsResultWithStats].map((result) => result.unwrap()));
    return null;
  };
}

export const getLatestTestRuns = createAsyncThunk(`${PREFIX}/GET_LATEST_TEST_RUNS`, () => {
  return model.getLatestsTestRuns();
});

export const getLatestTestRunsWithStats = createAsyncThunk(`${PREFIX}/GET_LATEST_TEST_RUNS_WITH_STATS`, () => {
  return model.getLatestsTestRunsWithStats();
});

export const createTestRun = createAsyncThunk(
  `${PREFIX}/CREATE_TEST_RUN`,
  ({ type, environment, name, labels }: CreateTestRunArgs) => {
    return model.createTestRun({ type, environment, name, labels });
  }
);

export const purgeTestRuns = createAsyncThunk(
  `${PREFIX}/DELETE_MANY_TEST_RUNS`,
  ({ testRunIds }: { testRunIds: string[] }) => {
    return model.deleteManyTestRuns({ testRunIds });
  }
);

const initialState = {
  testRuns: [] as TestRunRecord[]
};

const testRunsSlice = createSlice({
  name: "testRuns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestTestRuns.fulfilled, (state, action) => {
        state.testRuns = mergeTestRuns(state.testRuns, action.payload);
      })
      .addCase(getLatestTestRunsWithStats.fulfilled, (state, action) => {
        state.testRuns = mergeTestRuns(state.testRuns, action.payload);
      })
      .addCase(createTestRun.fulfilled, (state, action) => {
        state.testRuns = [action.payload, ...state.testRuns];
      })
      .addCase(purgeTestRuns.fulfilled, (state, action) => {
        const testRunIdsSet = new Set(action.meta.arg.testRunIds);
        state.testRuns = state.testRuns.filter((testRun) => !testRunIdsSet.has(testRun.id));
      });
  }
});

function mergeTestRuns(testRuns: TestRunRecord[], nextTestRuns: TestRunRecord[]) {
  const testRunsById = new Map();
  testRuns.forEach((testRun) => {
    testRunsById.set(testRun.id, testRun);
  });

  return nextTestRuns.map((nextTestRun) => {
    const testRun = testRunsById.get(nextTestRun.id);
    return {
      ...testRun,
      ...nextTestRun
    };
  });
}

export const testRuns = testRunsSlice.reducer;
