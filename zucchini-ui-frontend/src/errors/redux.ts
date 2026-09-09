import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: [] as string[]
};

function getErrorMessage(action) {
  if (action.payload) {
    return `${action.payload}`;
  }

  if (action.error?.message) {
    return action.error.message;
  }

  return `${action.error}`;
}

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    clearErrors: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => Boolean(action.error),
      (state, action) => {
        state.errors.push(getErrorMessage(action));
      }
    );
  }
});

export const { clearErrors } = errorsSlice.actions;
export const errors = errorsSlice.reducer;
