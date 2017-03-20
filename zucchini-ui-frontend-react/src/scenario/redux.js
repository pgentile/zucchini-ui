import { handleActions } from 'redux-actions';

import * as model from './model'
import { getTestRun } from '../testRun/redux';
import { getFeature } from '../feature/redux';


// Actions

const PREFIX = 'SCENARIO';

const GET_SCENARIO = `${PREFIX}/GET_SCENARIO`;
const GET_SCENARIO_FULFILED = `${GET_SCENARIO}_FULFILLED`;

const GET_SCENARIO_HISTORY = `${PREFIX}/GET_SCENARIO_HISTORY`;
const GET_SCENARIO_HISTORY_FULFILED = `${GET_SCENARIO_HISTORY}_FULFILLED`;


// Action creators

export function loadScenarioPage({ scenarioId }) {
  return dispatch => {

    const scenario$ = dispatch(getScenario({ scenarioId }));

    const testRun$ = scenario$.then(result => {
      const scenario = result.value;
      const testRunId = scenario.testRunId;
      return dispatch(getTestRun({ testRunId }));
    });

    const feature$ = scenario$.then(result => {
      const scenario = result.value;
      const featureId = scenario.featureId;
      return dispatch(getFeature({ featureId }));
    });

    const history$ = dispatch(getScenarioHistory({ scenarioId }));

    return Promise.all([scenario$, testRun$, feature$, history$]).then(() => null);
  };
}

export function getScenario({ scenarioId }) {
  return {
    type: GET_SCENARIO,
    payload: model.getScenario({ scenarioId }),
    meta: {
      scenarioId,
    },
  };
}

export function getScenarioHistory({ scenarioId }) {
  return {
    type: GET_SCENARIO_HISTORY,
    payload: model.getScenarioHistory({ scenarioId }),
    meta: {
      scenarioId,
    },
  };
}


// Reducer

const initialState = {
  scenario: {
    info: {},
    tags: [],
  },
  history: [],
};

export const scenario = handleActions({

  [GET_SCENARIO_FULFILED]: (state, action) => ({
    ...state,
    scenario: action.payload,
  }),

  [GET_SCENARIO_HISTORY_FULFILED]: (state, action) => ({
    ...state,
    history: action.payload,
  }),

}, initialState);
