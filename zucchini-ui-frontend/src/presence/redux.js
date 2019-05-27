import { handleActions } from "redux-actions";
import trimStart from "lodash/trimStart";

import presenceInfoStorage from "./presenceInfoStorage";

// Actions

export const PREFIX = "PRESENCE";

// Actions creators

const watcherId = presenceInfoStorage.read().watcherId;

export function watch({ referenceType, reference }) {
  return dispatch => {
    return dispatch({
      type: `${PREFIX}/WS_OPEN`,
      payload: {
        url: createWebSocketUrl(`/ws/presence?reference=${reference}&type=${referenceType}&watcherId=${watcherId}`),
        onKeepAlive: () => {
          dispatch({
            type: `${PREFIX}/WS_SEND`,
            payload: {
              type: "REFRESH"
            }
          });
        }
      }
    });
  };
}

function createWebSocketUrl(targetUrl) {
  const protocol = window.location.protocol === "https" ? "wss" : "ws";
  return `${protocol}://${window.location.host}/${trimStart(targetUrl, "/")}`;
}

export function unwatch() {
  return {
    type: `${PREFIX}/WS_CLOSE`
  };
}

// Reducer

const initialState = {
  otherWatcherIds: null
};

export const presence = handleActions(
  {
    [`${PREFIX}/WS_MESSAGE`]: (state, action) => {
      const { payload } = action;

      switch (payload.type) {
        case "OTHER_WATCHERS":
          return {
            ...state,
            otherWatcherIds: payload.watcherIds
          };

        default:
          break;
      }

      return state;
    },

    [`${PREFIX}/WS_CLOSED`]: state => {
      return {
        ...state,
        otherWatcherIds: null
      };
    }
  },
  initialState
);
