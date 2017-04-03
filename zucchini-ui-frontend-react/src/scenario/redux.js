import { handleActions } from 'redux-actions';

import * as model from './model'
import { getTestRun } from '../testRun/redux';
import { getFeature, getScenarios } from '../feature/redux';


// Actions

const PREFIX = 'SCENARIO';

const GET_SCENARIO = `${PREFIX}/GET_SCENARIO`;
const GET_SCENARIO_FULFILED = `${GET_SCENARIO}_FULFILLED`;

const GET_SCENARIO_HISTORY = `${PREFIX}/GET_SCENARIO_HISTORY`;
const GET_SCENARIO_HISTORY_FULFILED = `${GET_SCENARIO_HISTORY}_FULFILLED`;

const GET_SCENARIO_COMMENTS = `${PREFIX}/GET_SCENARIO_COMMENTS`;
const GET_SCENARIO_COMMENTS_FULFILED = `${GET_SCENARIO_COMMENTS}_FULFILLED`;

const UPDATE_SCENARIO_STATE = `${PREFIX}/UPDATE_SCENARIO_STATE`;
//const UPDATE_SCENARIO_STATE_FULFILED = `${UPDATE_SCENARIO_STATE}_FULFILLED`;

const ADD_SCENARIO_COMMENT = `${PREFIX}/ADD_SCENARIO_COMMENT`;


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

    const sameFeatureScenarios$ = scenario$.then(result => {
      const scenario = result.value;
      const featureId = scenario.featureId;
      return dispatch(getScenarios({ featureId }));
    });

    const history$ = dispatch(getScenarioHistory({ scenarioId }));
    const comments$ = dispatch(getScenarioComments({ scenarioId }));

    return Promise.all([scenario$, testRun$, feature$, history$, comments$, sameFeatureScenarios$]).then(() => null);
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

export function getScenarioComments({ scenarioId }) {
  return {
    type: GET_SCENARIO_COMMENTS,
    payload: model.getScenarioComments({ scenarioId }),
    meta: {
      scenarioId,
    },
  };
}

export function updateScenarioState({ scenarioId, newState }) {
  return {
    type: UPDATE_SCENARIO_STATE,
    payload: model.updateScenarioState({ scenarioId, newState }),
    meta: {
      scenarioId,
    },
  };
}

export function addScenarioComment({ scenarioId, comment }) {
  return {
    type: ADD_SCENARIO_COMMENT,
    payload: model.addScenarioComment({ scenarioId, comment }),
    meta: {
      scenarioId,
    },
  };
}

export function updateScenarioStateAndComment({ scenarioId, newState, comment }) {
  return dispatch => {
    const updateScenarioState$ = dispatch(updateScenarioState({
      scenarioId,
      newState,
    }));

    let addComment$ = Promise.resolve(null);
    if (comment) {
      addComment$ = dispatch(addScenarioComment({ scenarioId, comment }));
    }

    return Promise.all([updateScenarioState$, addComment$])
      .then(() => dispatch(loadScenarioPage({ scenarioId })))
      .then(() => null);
  }
}

export function addScenarioCommentAndReload({ scenarioId, comment }) {
  return dispatch => {
    const addComment$ = dispatch(addScenarioComment({ scenarioId, comment }));

    return addComment$
      .then(() => dispatch(loadScenarioPage({ scenarioId })))
      .then(() => null);
  };
}


// Reducer

const initialState = {
  scenario: {
    info: {},
    allTags: [],
    changes: [],
    steps: [],
    background: {
      steps: [],
    },
    beforeActions: [],
    afterActions: [],
  },
  history: [],
  comments: [],
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

  [GET_SCENARIO_COMMENTS_FULFILED]: (state, action) => ({
    ...state,
    comments: action.payload,
  }),

}, initialState);
