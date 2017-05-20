import { handleActions } from 'redux-actions';

import presenceInfoStorage from './presenceInfoStorage'


// Actions

export const PREFIX = 'PRESENCE';


// Actions creators

const watcherId = presenceInfoStorage.read().watcherId;


export function watch({ referenceType, reference }) {
  return {
    type: `${PREFIX}/WS_OPEN`,
    payload: {
      url: createWebSocketUrl(`/ws/presence?reference=${reference}&type=${referenceType}&watcherId=${watcherId}`),
    },
  };
}


function createWebSocketUrl(targetUrl) {
  const parts = _.split(configuration.backendBaseUri, '://', 2);
  const baseProtocol = parts[0];
  const remainingUrl = parts[1];

  let protocol = 'ws';
  if (baseProtocol === 'https') {
    protocol = 'wss';
  }

  return `${protocol }://${ _.trimEnd(remainingUrl, '/') }/${ _.trimStart(targetUrl, '/')}`;
}


export function unwatch() {
  return {
    type: `${PREFIX}/WS_CLOSE`,
  };
}


// Reducer

const initialState = {
  otherWatcherIds: null,
};


export const presence = handleActions({

  [`${PREFIX}/WS_MESSAGE`]: (state, action) => {
    const { payload } = action;

    switch (payload.type) {
    case 'OTHER_WATCHERS':
      return {
        ...state,
        otherWatcherIds: payload.watcherIds,
      };

    default:
      break;
    }

    return state;
  },

  [`${PREFIX}/WS_CLOSED`]: state => {
    return {
      ...state,
      otherWatcherIds: null,
    };
  },

}, initialState);
