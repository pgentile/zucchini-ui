// Actions

const PREFIX = "ERRORS";

const CLEAR_ERRORS = `${PREFIX}/CLEAR_ERRORS`;

// Actions creators

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}

// Reducer

const initialState = {
  errors: []
};

export function errors(state = initialState, action) {
  if (action && action.error) {
    return {
      ...state,
      errors: [...state.errors, `${action.payload}`]
    };
  }

  if (action.type === CLEAR_ERRORS) {
    return initialState;
  }

  return state;
}
