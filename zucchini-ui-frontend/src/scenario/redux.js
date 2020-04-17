import { handleActions } from "redux-actions";

import * as model from "./model";
import { getTestRun } from "../testRun/redux";
import { getFeature, getScenarios } from "../feature/redux";

// Actions

const PREFIX = "SCENARIO";

const GET_SCENARIO = `${PREFIX}/GET_SCENARIO`;
const GET_SCENARIO_FULFILLED = `${GET_SCENARIO}_FULFILLED`;

const GET_SCENARIO_HISTORY = `${PREFIX}/GET_SCENARIO_HISTORY`;
const GET_SCENARIO_HISTORY_FULFILLED = `${GET_SCENARIO_HISTORY}_FULFILLED`;

const GET_SIMILAR_FAILURE_SCENARIOS = `${PREFIX}/GET_SIMILAR_FAILURE_SCENARIOS`;
const GET_SIMILAR_FAILURE_SCENARIOS_FULFILLED = `${GET_SIMILAR_FAILURE_SCENARIOS}_FULFILLED`;

const GET_SCENARIO_COMMENTS = `${PREFIX}/GET_SCENARIO_COMMENTS`;
const GET_SCENARIO_COMMENTS_FULFILLED = `${GET_SCENARIO_COMMENTS}_FULFILLED`;

const UPDATE_SCENARIO_STATE = `${PREFIX}/UPDATE_SCENARIO_STATE`;

const ADD_SCENARIO_COMMENT = `${PREFIX}/ADD_SCENARIO_COMMENT`;

const DELETE_SCENARIO = `${PREFIX}/DELETE_SCENARIO`;

const DELETE_COMMENT = `${PREFIX}/DELETE_COMMENT`;
const DELETE_COMMENT_PENDING = `${DELETE_COMMENT}_PENDING`;

const UPDATE_COMMENT = `${PREFIX}/UPDATE_COMMENT`;
const UPDATE_COMMENT_PENDING = `${UPDATE_COMMENT}_PENDING`;

// Action creators

export function loadScenarioPage({ scenarioId }) {
  return async (dispatch) => {
    const scenarioResult$ = dispatch(getScenario({ scenarioId }));
    const historyResult$ = dispatch(getScenarioHistory({ scenarioId }));
    const commentsResult$ = dispatch(getScenarioComments({ scenarioId }));

    const scenarioResult = await scenarioResult$;
    const scenario = scenarioResult.value;
    const { testRunId, featureId } = scenario;

    let similarFailureScenariosResult$ = null;
    if (scenario.status === "FAILED") {
      similarFailureScenariosResult$ = dispatch(getSimilarFailureScenarios({ scenarioId }));
    }

    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const featureResult$ = dispatch(getFeature({ featureId }));
    const sameFeatureScenariosResult$ = dispatch(getScenarios({ featureId }));

    await scenarioResult$;
    await historyResult$;
    await commentsResult$;
    await similarFailureScenariosResult$;
    await testRunResult$;
    await featureResult$;
    await sameFeatureScenariosResult$;
  };
}

export function getScenario({ scenarioId }) {
  return {
    type: GET_SCENARIO,
    payload: model.getScenario({ scenarioId }),
    meta: {
      scenarioId
    }
  };
}

export function getScenarioHistory({ scenarioId }) {
  return {
    type: GET_SCENARIO_HISTORY,
    payload: model.getScenarioHistory({ scenarioId }),
    meta: {
      scenarioId
    }
  };
}

export function getSimilarFailureScenarios({ scenarioId }) {
  return {
    type: GET_SIMILAR_FAILURE_SCENARIOS,
    payload: model.getSimilarFailureScenarios({ scenarioId }),
    meta: {
      scenarioId
    }
  };
}

export function getScenarioComments({ scenarioId }) {
  return {
    type: GET_SCENARIO_COMMENTS,
    payload: model.getScenarioComments({ scenarioId }),
    meta: {
      scenarioId
    }
  };
}

export function updateScenarioState({ scenarioId, newState }) {
  return {
    type: UPDATE_SCENARIO_STATE,
    payload: model.updateScenarioState({ scenarioId, newState }),
    meta: {
      scenarioId
    }
  };
}

export function addScenarioComment({ scenarioId, comment }) {
  return {
    type: ADD_SCENARIO_COMMENT,
    payload: model.addScenarioComment({ scenarioId, comment }),
    meta: {
      scenarioId
    }
  };
}

export function deleteScenario({ scenarioId }) {
  return {
    type: DELETE_SCENARIO,
    payload: model.deleteScenario({ scenarioId }),
    meta: {
      scenarioId
    }
  };
}

export function updateScenarioStateAndComment({ scenarioId, newState, comment }) {
  return async (dispatch) => {
    await dispatch(
      updateScenarioState({
        scenarioId,
        newState
      })
    );

    if (comment) {
      await dispatch(addScenarioComment({ scenarioId, comment }));
    }

    await dispatch(loadScenarioPage({ scenarioId }));

    return null;
  };
}

export function addScenarioCommentAndReload({ scenarioId, comment }) {
  return async (dispatch) => {
    await dispatch(addScenarioComment({ scenarioId, comment }));
    await dispatch(getScenarioComments({ scenarioId }));

    return null;
  };
}

export function setNonReviewedStateThenReload({ scenarioId }) {
  return updateScenarioStateAndComment({
    scenarioId,
    newState: {
      reviewed: false
    }
  });
}

export function setScenarioReviewedStateAndComment({ scenarioId, comment }) {
  return updateScenarioStateAndComment({
    scenarioId,
    newState: {
      reviewed: true
    },
    comment
  });
}

export function deleteComment({ scenarioId, commentId }) {
  return {
    type: DELETE_COMMENT,
    payload: model.deleteComment({ scenarioId, commentId }),
    meta: {
      scenarioId,
      commentId
    }
  };
}

export function updateComment({ scenarioId, commentId, newContent }) {
  return {
    type: UPDATE_COMMENT,
    payload: model.updateComment({ scenarioId, commentId, newContent }),
    meta: {
      scenarioId,
      commentId,
      newContent
    }
  };
}

export function updateCommentThenReload({ scenarioId, commentId, newContent }) {
  return async (dispatch) => {
    await dispatch(updateComment({ scenarioId, commentId, newContent }));
    await dispatch(getScenarioComments({ scenarioId }));

    return null;
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
      steps: []
    },
    beforeActions: [],
    afterActions: []
  },
  similarFailureScenarios: [],
  history: [],
  comments: []
};

export const scenario = handleActions(
  {
    [GET_SCENARIO_FULFILLED]: (state, action) => ({
      ...state,
      scenario: action.payload
    }),

    [GET_SIMILAR_FAILURE_SCENARIOS_FULFILLED]: (state, action) => ({
      ...state,
      similarFailureScenarios: action.payload
    }),

    [GET_SCENARIO_HISTORY_FULFILLED]: (state, action) => ({
      ...state,
      history: action.payload
    }),

    [GET_SCENARIO_COMMENTS_FULFILLED]: (state, action) => ({
      ...state,
      comments: action.payload
    }),

    [UPDATE_COMMENT_PENDING]: (state, action) => {
      let { comments } = state;
      const { commentId, newContent } = action.meta;

      comments = comments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        return {
          ...comment,
          content: newContent
        };
      });

      return {
        ...state,
        comments
      };
    },

    [DELETE_COMMENT_PENDING]: (state, action) => {
      let { comments } = state;
      comments = comments.filter((comment) => comment.id !== action.meta.commentId);

      return {
        ...state,
        comments
      };
    }
  },
  initialState
);
