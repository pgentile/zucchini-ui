import { handleActions } from "redux-actions";
import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";

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
  const parts = configuration.backendBaseUri.split("://", 2);
  const baseProtocol = parts[0];
  const remainingUrl = parts[1];

  let protocol = "ws";
  if (baseProtocol === "https") {
    protocol = "wss";
  }

  return `${protocol}://${trimEnd(remainingUrl, "/")}/${trimStart(targetUrl, "/")}`;
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
