import * as model from './model';
import {getTestRun, getTestRunStats} from '../testRun/redux';
import {handleActions} from 'redux-actions';


// Actions

const PREFIX = 'FAILURES';
const GET_FAILURES = `${PREFIX}/GET_FAILURES`;
const GET_FAILURES_FULFILLED = `${GET_FAILURES}_FULFILLED`;

// Action creators

export function loadTestRunFailuresPage({testRunId}) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({testRunId}));
    const failuresResult$ = dispatch(getTestRunFailures({testRunId}));
    const stats$ = dispatch(getTestRunStats({ testRunId}));

    await testRunResult$;
    await failuresResult$;
    await stats$;
    return null;
  };
}


export function getTestRunFailures({testRunId}) {
  return {
    type: GET_FAILURES,
    payload: model.getTestRunFailures({testRunId}),
    meta: {
      testRunId,
    },
  };
}

// Reducer
const initialState = {
  failures: []
};

export const failures = handleActions({

  [GET_FAILURES_FULFILLED]: (state, action) => ({
    ...state,
    failures: action.payload,
  })
}, initialState);



