import { handleActions } from "redux-actions";

import { getTestRun } from "../testRun/redux";
import * as model from "./model";

// Actions

const PREFIX = "TAGS";

const GET_TAGS = `${PREFIX}/GET_TAGS`;
const GET_TAGS_FULFILLED = `${GET_TAGS}_FULFILLED`;

const SET_TAG_FILTER = "SET_TAG_FILTER";

// Action creators

export function loadTestRunTagsPage({ testRunId }) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const tagsResult$ = dispatch(getTags({ testRunId }));

    await testRunResult$;
    await tagsResult$;

    return null;
  };
}

export function getTags({ testRunId }) {
  return {
    type: GET_TAGS,
    payload: model.getTags({ testRunId }),
    meta: {
      testRunId
    }
  };
}

export function setTagFilter({ filter }) {
  return {
    type: SET_TAG_FILTER,
    payload: filter
  };
}

// Reducer

const initialState = {
  tags: [],
  filter: ""
};

export const tags = handleActions(
  {
    [GET_TAGS_FULFILLED]: (state, action) => ({
      ...state,
      tags: action.payload
    }),

    [SET_TAG_FILTER]: (state, action) => ({
      ...state,
      filter: action.payload
    })
  },
  initialState
);
