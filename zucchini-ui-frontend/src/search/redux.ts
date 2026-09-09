import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTestRun } from "../testRun/redux";
import * as model from "./model";

const PREFIX = "SEARCH";

export function loadTestRunSearchPage({ testRunId }: { testRunId: string }) {
  return getTestRun({ testRunId });
}

export const search = createAsyncThunk(
  `${PREFIX}/SEARCH`,
  ({ search, testRunId }: { search: string; testRunId: string }) => {
    return model.search({ search, testRunId });
  }
);

const initialState = {
  foundScenarios: []
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(search.fulfilled, (state, action) => {
      state.foundScenarios = action.payload;
    });
  }
});

export const searchResults = searchResultsSlice.reducer;
