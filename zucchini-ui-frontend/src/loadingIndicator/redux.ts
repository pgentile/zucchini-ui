import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

const initialState = {
  count: 0
};

const loadingIndicatorSlice = createSlice({
  name: "loadingIndicator",
  initialState,
  reducers: {
    load: (state) => {
      state.count += 1;
    },
    unload: (state) => {
      state.count -= 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.count += 1;
      })
      .addMatcher(isFulfilled, (state) => {
        state.count -= 1;
      })
      .addMatcher(isRejected, (state) => {
        state.count -= 1;
      });
  }
});

export const { load, unload } = loadingIndicatorSlice.actions;
export const loadingIndicator = loadingIndicatorSlice.reducer;
