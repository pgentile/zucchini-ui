import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTestRun } from "../testRun/redux";
import * as model from "./model";

const PREFIX = "TAGS";

export function loadTestRunTagsPage({ testRunId }: { testRunId: string }) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const tagsResult = dispatch(getTags({ testRunId }));

    await Promise.all([testRunResult, tagsResult].map((result) => result.unwrap()));

    return null;
  };
}

export const getTags = createAsyncThunk(`${PREFIX}/GET_TAGS`, ({ testRunId }: { testRunId: string }) => {
  return model.getTags({ testRunId });
});

const initialState = {
  tags: [],
  filter: ""
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTagFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  }
});

export const { setTagFilter } = tagsSlice.actions;
export const tags = tagsSlice.reducer;
