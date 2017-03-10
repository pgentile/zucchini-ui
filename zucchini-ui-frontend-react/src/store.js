import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  routerMiddleware(browserHistory),
  thunkMiddleware,
  promiseMiddleware(),
];

const initialState = {};

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

const history = syncHistoryWithStore(browserHistory, store);

export default store;
export { history };
