import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as model from "./model";
import { getTestRun } from "../testRun/redux";
import { getFeature, getScenarios } from "../feature/redux";

const PREFIX = "SCENARIO";

type ScenarioRecord = {
  id?: string;
  status?: string;
  testRunId?: string;
  featureId?: string;
  [key: string]: unknown;
};

type CommentRecord = {
  id?: string;
  content?: string;
  [key: string]: unknown;
};

type ScenarioState = {
  scenario: ScenarioRecord;
  similarFailureScenarios: unknown[];
  history: unknown[];
  comments: CommentRecord[];
};

export function loadScenarioPage({ scenarioId }: { scenarioId: string }) {
  return async (dispatch) => {
    const scenarioResult = dispatch(getScenario({ scenarioId }));
    const historyResult = dispatch(getScenarioHistory({ scenarioId }));
    const commentsResult = dispatch(getScenarioComments({ scenarioId }));

    const loadedScenario = await scenarioResult.unwrap();
    const { testRunId, featureId } = loadedScenario;

    const similarFailureScenariosResult =
      loadedScenario.status === "FAILED" ? dispatch(getSimilarFailureScenarios({ scenarioId })) : null;
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const featureResult = dispatch(getFeature({ featureId }));
    const sameFeatureScenariosResult = dispatch(getScenarios({ featureId }));

    await Promise.all(
      [
        historyResult,
        commentsResult,
        similarFailureScenariosResult,
        testRunResult,
        featureResult,
        sameFeatureScenariosResult
      ]
        .filter(Boolean)
        .map((result) => result.unwrap())
    );
  };
}

export const getScenario = createAsyncThunk(`${PREFIX}/GET_SCENARIO`, ({ scenarioId }: { scenarioId: string }) => {
  return model.getScenario({ scenarioId });
});

export const getScenarioHistory = createAsyncThunk(
  `${PREFIX}/GET_SCENARIO_HISTORY`,
  ({ scenarioId }: { scenarioId: string }) => {
    return model.getScenarioHistory({ scenarioId });
  }
);

export const getSimilarFailureScenarios = createAsyncThunk(
  `${PREFIX}/GET_SIMILAR_FAILURE_SCENARIOS`,
  ({ scenarioId }: { scenarioId: string }) => {
    return model.getSimilarFailureScenarios({ scenarioId });
  }
);

export const getScenarioComments = createAsyncThunk(
  `${PREFIX}/GET_SCENARIO_COMMENTS`,
  ({ scenarioId }: { scenarioId: string }) => {
    return model.getScenarioComments({ scenarioId });
  }
);

export const updateScenarioState = createAsyncThunk(
  `${PREFIX}/UPDATE_SCENARIO_STATE`,
  ({ scenarioId, newState }: { scenarioId: string; newState: Record<string, unknown> }) => {
    return model.updateScenarioState({ scenarioId, newState });
  }
);

export const addScenarioComment = createAsyncThunk(
  `${PREFIX}/ADD_SCENARIO_COMMENT`,
  ({ scenarioId, comment }: { scenarioId: string; comment: string }) => {
    return model.addScenarioComment({ scenarioId, comment });
  }
);

export const deleteScenario = createAsyncThunk(
  `${PREFIX}/DELETE_SCENARIO`,
  ({ scenarioId }: { scenarioId: string }) => {
    return model.deleteScenario({ scenarioId });
  }
);

export function updateScenarioStateAndComment({
  scenarioId,
  newState,
  comment
}: {
  scenarioId: string;
  newState: Record<string, unknown>;
  comment?: string;
}) {
  return async (dispatch) => {
    await dispatch(updateScenarioState({ scenarioId, newState })).unwrap();

    if (comment) {
      await dispatch(addScenarioComment({ scenarioId, comment })).unwrap();
    }

    await dispatch(loadScenarioPage({ scenarioId }));

    return null;
  };
}

export function addScenarioCommentAndReload({ scenarioId, comment }: { scenarioId: string; comment: string }) {
  return async (dispatch) => {
    const addedComment = await dispatch(addScenarioComment({ scenarioId, comment })).unwrap();
    await dispatch(getScenarioComments({ scenarioId })).unwrap();

    return addedComment;
  };
}

export function setNonReviewedStateThenReload({ scenarioId }: { scenarioId: string }) {
  return updateScenarioStateAndComment({
    scenarioId,
    newState: {
      reviewed: false
    }
  });
}

export function setScenarioReviewedStateAndComment({ scenarioId, comment }: { scenarioId: string; comment?: string }) {
  return updateScenarioStateAndComment({
    scenarioId,
    newState: {
      reviewed: true
    },
    comment
  });
}

export const deleteComment = createAsyncThunk(
  `${PREFIX}/DELETE_COMMENT`,
  ({ scenarioId, commentId }: { scenarioId: string; commentId: string }) => {
    return model.deleteComment({ scenarioId, commentId });
  }
);

export const updateComment = createAsyncThunk(
  `${PREFIX}/UPDATE_COMMENT`,
  ({ scenarioId, commentId, newContent }: { scenarioId: string; commentId: string; newContent: string }) => {
    return model.updateComment({ scenarioId, commentId, newContent });
  }
);

export function updateCommentThenReload({
  scenarioId,
  commentId,
  newContent
}: {
  scenarioId: string;
  commentId: string;
  newContent: string;
}) {
  return async (dispatch) => {
    await dispatch(updateComment({ scenarioId, commentId, newContent })).unwrap();
    await dispatch(getScenarioComments({ scenarioId })).unwrap();

    return null;
  };
}

const initialState: ScenarioState = {
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

const scenarioSlice = createSlice({
  name: "scenario",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScenario.fulfilled, (state, action) => {
        state.scenario = action.payload;
      })
      .addCase(getSimilarFailureScenarios.fulfilled, (state, action) => {
        state.similarFailureScenarios = action.payload;
      })
      .addCase(getScenarioHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(getScenarioComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(updateComment.pending, (state, action) => {
        const { commentId, newContent } = action.meta.arg;
        state.comments = state.comments.map((comment) => {
          if (comment.id !== commentId) {
            return comment;
          }

          return {
            ...comment,
            content: newContent
          };
        });
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.meta.arg.commentId);
      });
  }
});

export const scenario = scenarioSlice.reducer;
