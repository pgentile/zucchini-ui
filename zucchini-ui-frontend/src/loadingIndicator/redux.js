import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';


// Reducer

const initialState = {
  counter: 0,
};

export function loadingIndicator(state = initialState, action) {
  const { type: actionType } = action;

  if (actionType) {
    if (actionType.endsWith(`_${PENDING}`)) {
      // Pending action
      return {
        ...state,
        counter: state.counter + 1,
      };
    } else if (actionType.endsWith(`_${FULFILLED}`) || actionType.endsWith(`_${REJECTED}`)) {
      // Done action (with success or failure)
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
  }

  return state;
}
