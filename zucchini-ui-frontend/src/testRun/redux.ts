import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as model from "./model";

const PREFIX = "TEST_RUN";

type TestRunRecord = {
  id?: string;
  type?: string;
  environment?: string;
  labels?: unknown[];
  stats?: unknown;
  [key: string]: unknown;
};

type TestRunState = {
  testRun: TestRunRecord;
  stats: unknown;
  history: TestRunRecord[];
  features: unknown[];
};

type ImportCucumberResultArgs = {
  testRunId: string;
  file: unknown;
  [key: string]: unknown;
};

type EditTestRunArgs = {
  testRunId: string;
  type: string;
  environment: string;
  name: string;
  labels: unknown[];
};

export function loadTestRunPage({ testRunId }: { testRunId: string }) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const statsResult = dispatch(getTestRunStats({ testRunId }));
    const featuresResult = dispatch(getFeatures({ testRunId }));

    const loadedTestRun = await testRunResult.unwrap();
    const historyResult = dispatch(getTestRunHistoryByType({ testRunId, testRunType: loadedTestRun.type }));

    await Promise.all([statsResult, historyResult, featuresResult].map((result) => result.unwrap()));

    return null;
  };
}

export const getTestRun = createAsyncThunk(`${PREFIX}/GET_TEST_RUN`, ({ testRunId }: { testRunId: string }) => {
  return model.getTestRun({ testRunId });
});

export const getTestRunStats = createAsyncThunk(
  `${PREFIX}/GET_TEST_RUN_STATS`,
  ({ testRunId }: { testRunId: string }) => {
    return model.getTestRunStats({ testRunId });
  }
);

export const getTestRunHistoryByType = createAsyncThunk(
  `${PREFIX}/GET_TEST_RUN_HISTORY`,
  ({ testRunType }: { testRunId: string; testRunType: string }) => {
    return model.getTestRunHistoryByType({ type: testRunType });
  }
);

export const getFeatures = createAsyncThunk(`${PREFIX}/GET_FEATURES`, ({ testRunId }: { testRunId: string }) => {
  return model.getFeatures({ testRunId });
});

export const deleteTestRun = createAsyncThunk(`${PREFIX}/DELETE_TEST_RUN`, ({ testRunId }: { testRunId: string }) => {
  return model.deleteTestRun({ testRunId });
});

export const importCucumberResult = createAsyncThunk(
  `${PREFIX}/IMPORT_CUCUMBER_RESULTS`,
  ({ testRunId, file, ...options }: ImportCucumberResultArgs) => {
    return model.importCucumberResult({ testRunId, file, ...options });
  }
);

export function importCucumberResultThenReload({ testRunId, file, ...options }: ImportCucumberResultArgs) {
  return async (dispatch) => {
    await dispatch(importCucumberResult({ testRunId, file, ...options })).unwrap();
    return await dispatch(loadTestRunPage({ testRunId }));
  };
}

export const editTestRun = createAsyncThunk(
  `${PREFIX}/EDIT_TEST_RUN`,
  ({ testRunId, type, environment, name, labels }: EditTestRunArgs) => {
    return model.editTestRun({ testRunId, type, environment, name, labels });
  }
);

export function editTestRunThenReload({ testRunId, type, environment, name, labels }: EditTestRunArgs) {
  return async (dispatch) => {
    await dispatch(editTestRun({ testRunId, type, environment, name, labels })).unwrap();
    return await dispatch(loadTestRunPage({ testRunId }));
  };
}

const initialState: TestRunState = {
  testRun: {
    labels: []
  },
  stats: model.createStatsWithZeros(),
  history: [],
  features: []
};

const testRunSlice = createSlice({
  name: "testRun",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestRun.fulfilled, (state, action) => {
        state.testRun = action.payload;
      })
      .addCase(getTestRunStats.fulfilled, (state, action) => {
        const stats = action.payload;
        const { testRunId } = action.meta.arg;

        state.history = state.history.map((testRun) => {
          if (testRun.id === testRunId) {
            return {
              ...testRun,
              stats
            };
          }
          return testRun;
        });
        state.stats = stats;
      })
      .addCase(getTestRunHistoryByType.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(getFeatures.fulfilled, (state, action) => {
        state.features = action.payload;
      });
  }
});

export const testRun = testRunSlice.reducer;
