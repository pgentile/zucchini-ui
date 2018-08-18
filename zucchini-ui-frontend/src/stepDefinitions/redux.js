import * as model from "./model";
import { getTestRun } from "../testRun/redux";
import { handleActions } from "redux-actions";

// Actions
const PREFIX = "STEP_DEFINITIONS";
const GET_STEP_DEFINITIONS = `${PREFIX}/GET_STEP_DEFINITIONS`;
const GET_STEP_DEFINITIONS_FULFILLED = `${GET_STEP_DEFINITIONS}_FULFILLED`;

// Action creators
export function loadTestRunStepDefinitionsPage({ testRunId }) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const stepDefinitionsResult$ = dispatch(getTestRunStepDefinitions({ testRunId }));

    await testRunResult$;
    await stepDefinitionsResult$;
    return null;
  };
}

export function getTestRunStepDefinitions({ testRunId }) {
  return {
    type: GET_STEP_DEFINITIONS,
    payload: model.getStepDefinitions({ testRunId }),
    meta: {
      testRunId
    }
  };
}

// Reducer
const initialState = {
  stepDefinitions: []
};

export const stepDefinitions = handleActions(
  {
    [GET_STEP_DEFINITIONS_FULFILLED]: (state, action) => ({
      ...state,
      stepDefinitions: action.payload
    })
  },
  initialState
);
