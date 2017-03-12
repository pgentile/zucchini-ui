import { handleActions } from 'redux-actions';

import * as model from './model'

import { getTestRun } from '../testRun/redux';


// Actions

const PREFIX = 'FEATURE';

const GET_FEATURE = `${PREFIX}/GET_FEATURE`;
const GET_FEATURE_FULFILED = `${GET_FEATURE}_FULFILLED`;


// Action creators

export function getFeature({ featureId }) {
  return dispatch => {

    const feature$ = dispatch({
      type: GET_FEATURE,
      payload: model.getFeature({ featureId }),
      meta: {
        featureId,
      },
    });

    // Load test run after feature loaded with success
    feature$.then(result => {
      const feature = result.value; // Action promise contain results in a value field
      dispatch(getTestRun({ testRunId: feature.testRunId }));
    });

  };
}


// Reducer

const initialState = {
  feature: {
    info: {},
  },
};

export const feature = handleActions({

  [GET_FEATURE_FULFILED]: (state, action) => ({
    ...state,
    feature: action.payload,
  }),

}, initialState);
