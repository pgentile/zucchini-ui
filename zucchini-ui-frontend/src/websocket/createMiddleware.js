import SimpleWebSocket from './SimpleWebSocket';
import { createAction } from 'redux-actions';


export default function createWebSocketMiddleware(prefix) {
  const openActionName = `${prefix}/WS_OPEN`;
  const sendActionName = `${prefix}/WS_SEND`;
  const closeActionName = `${prefix}/WS_CLOSE`;

  const closeAction = createAction(closeActionName);
  const openedAction = createAction(`${prefix}/WS_OPENED`);
  const closedAction = createAction(`${prefix}/WS_CLOSED`);
  const messageAction = createAction(`${prefix}/WS_MESSAGE`);
  const errorAction = createAction(`${prefix}/WS_ERROR`);

  return store => {

    const createWebSocket = ({ url, onKeepAlive }) => {
      return new SimpleWebSocket({
        url,
        onKeepAlive,
        onOpen: () => store.dispatch(openedAction()),
        onMessage: data => store.dispatch(messageAction(data)),
        onClose: () => store.dispatch(closedAction()),
        onError: () => {
          const error = new Error(`Communication failed with WebSocket: ${url}`);
          store.dispatch(errorAction(error));
        },
      });
    };

    let ws = null;

    return next => action => {
      switch (action.type) {
      case openActionName:
        if (ws) {
          // TODO Action dispatch race condition ?
          next(closeAction());
        }
        ws = createWebSocket(action.payload);
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
