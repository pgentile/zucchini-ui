import { ActionType } from "redux-promise-middleware";

// Actions

const PREFIX = "LOADING_INDICATOR";
const LOAD = `${PREFIX}/LOAD`;
const UNLOAD = `${PREFIX}/UNLOAD`;

// Action creators

export function load() {
  return { type: LOAD };
}

export function unload() {
  return { type: UNLOAD };
}

// Reducer

const initialState = {
  count: 0
};

export function loadingIndicator(state = initialState, action) {
  const { type } = action;

  if (type === LOAD || type.endsWith(`_${ActionType.Pending}`)) {
    const { count } = state;
    return {
      count: count + 1
    };
  }

  if (type === UNLOAD || type.endsWith(`_${ActionType.Fulfilled}`) || type.endsWith(`_${ActionType.Rejected}`)) {
    const { count } = state;
    return {
      count: count - 1
    };
  }

  return state;
}
