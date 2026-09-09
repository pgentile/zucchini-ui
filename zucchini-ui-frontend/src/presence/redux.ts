import { createAction, createSlice } from "@reduxjs/toolkit";

import presenceInfoStorage from "./presenceInfoStorage";

export const PREFIX = "PRESENCE";

const watcherId = presenceInfoStorage.read().watcherId;

type PresenceMessage = {
  type?: string;
  watcherIds?: string[];
};

export function watch({ referenceType, reference }) {
  return (dispatch) => {
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

function createWebSocketUrl(targetUrl: string) {
  const protocol = window.location.protocol === "https" ? "wss" : "ws";
  return `${protocol}://${window.location.host}/${targetUrl.replace(/^\/+/, "")}`;
}

export function unwatch() {
  return {
    type: `${PREFIX}/WS_CLOSE`
  };
}

const wsMessage = createAction<PresenceMessage>(`${PREFIX}/WS_MESSAGE`);
const wsClosed = createAction(`${PREFIX}/WS_CLOSED`);

const initialState = {
  otherWatcherIds: null as string[] | null
};

const presenceSlice = createSlice({
  name: "presence",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsMessage, (state, action) => {
        const payload = action.payload as PresenceMessage;

        if (payload.type === "OTHER_WATCHERS") {
          state.otherWatcherIds = payload.watcherIds ?? [];
        }
      })
      .addCase(wsClosed, (state) => {
        state.otherWatcherIds = null;
      });
  }
});

export const presence = presenceSlice.reducer;
