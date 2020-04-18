import { ActionType } from "redux-promise-middleware";

// Actions

const PREFIX = "LOADING_INDICATOR";
const LOAD = `${PREFIX}/LOAD`;
const UNLOAD = `${PREFIX}/UNLOAD`;

// Reducer

const initialState = {
  loading: false
};

export function loadingIndicator(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOAD:
      return {
        loading: true
      };
    case UNLOAD:
      return {
        loading: false
      };
    default:
      return state;
  }
}

// Middleware

export function loadingIndicatorMiddleware() {
  return () => {
    let count = 0;
    return (next) => (action) => {
      const { type } = action;

      if (type.endsWith(`_${ActionType.Pending}`)) {
        if (count === 0) {
          next({ type: LOAD });
        }

        count++;
      } else if (type.endsWith(`_${ActionType.Fulfilled}`) || type.endsWith(`_${ActionType.Rejected}`)) {
        // Add a small delay for better handling of sequential promises
        setTimeout(() => {
          count--;

          if (count === 0) {
            next({ type: UNLOAD });
          }
        }, 100);
      }

      return next(action);
    };
  };
}
