import { handleActions } from 'redux-actions';
import { replace } from 'react-router-redux'

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

const DELETE_SCENARIO = `${PREFIX}/DELETE_SCENARIO`;


// Action creators

export function loadScenarioPage({ scenarioId }) {
  return async dispatch => {

    const scenarioResult$ = dispatch(getScenario({ scenarioId }));
    const historyResult$ = dispatch(getScenarioHistory({ scenarioId }));
    const commentsResult$ = dispatch(getScenarioComments({ scenarioId }));

    const scenarioResult = await scenarioResult$;
    const scenario = scenarioResult.value;
    const { testRunId, featureId } = scenario;

    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const featureResult$ = dispatch(getFeature({ featureId }));
    const sameFeatureScenariosResult$ = dispatch(getScenarios({ featureId }));

    await Promise.all([
      scenarioResult$,
      historyResult$,
      commentsResult$,
      testRunResult$,
      featureResult$,
      sameFeatureScenariosResult$,
    ]);

    return null;
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

export function deleteScenario({ scenarioId }) {
  return {
    type: DELETE_SCENARIO,
    payload: model.deleteScenario({ scenarioId }),
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

export function deleteScenarioThenRedirect({ scenarioId }) {
  return (dispatch, getState) => {
    const deleteScenario$ = dispatch(deleteScenario({ scenarioId }));

    const featureId = getState().feature.feature.id;
    deleteScenario$.then(dispatch(replace(`/features/${featureId}`)));
  };
}

export function setNonReviewedStateThenReload({ scenarioId }) {
  return updateScenarioStateAndComment({
    scenarioId,
    newState: {
      reviewed: false,
    },
  });
}

export function setScenarioReviewedStateAndComment({ scenarioId, comment }) {
  return updateScenarioStateAndComment({
    scenarioId,
    newState: {
      reviewed: true,
    },
    comment,
  });
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
