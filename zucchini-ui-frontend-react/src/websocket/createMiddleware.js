import SimpleWebSocket from './SimpleWebSocket';
import { createAction } from 'redux-actions';


export default function createWebSocketMiddleware(prefix) {
  const openActionName = `${prefix}/WS_OPEN`;
  const sendActionName = `${prefix}/WS_SEND`;
  const closeActionName = `${prefix}/WS_CLOSE`;

  const openedAction = createAction(`${prefix}/WS_OPENED`);
  const closedAction = createAction(`${prefix}/WS_CLOSED`);
  const messageAction = createAction(`${prefix}/WS_MESSAGE`);
  const errorAction = createAction(`${prefix}/WS_ERROR`);

  return store => {

    const createWebSocket = url => {
      return new SimpleWebSocket({
        url,
        onOpen: () => store.dispatch(openedAction()),
        onMessage: data => store.dispatch(messageAction(data)),
        onClose: () => store.dispatch(closedAction()),
        onError: () => store.dispatch(errorAction()),
      });
    };

    let ws = null;

    return next => action => {
      switch (action.type) {
      case openActionName:
        if (ws) {
          // TODO Action dispatch race condition ?
          ws.close();
        }
        ws = createWebSocket(action.payload.url);
        ws.open();
        break;

      case sendActionName:
        if (ws) {
          ws.send(action.payload);
        }
        break;

      case closeActionName:
        if (ws) {
          ws.close();
        }
        ws = null;
        break;

      default:
        break;
      }

      return next(action);
    };

  };
}
