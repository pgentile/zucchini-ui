import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import freezeMiddleware from 'redux-freeze';

import browserHistory from './browserHistory';
import reducer from './reducer';
import featureFiltersStorage from './filters/featureFiltersStorage';
import statsDashboardFiltersStorage from './filters/statsDashboardFiltersStorage';
import historyFiltersStorage from './filters/historyFiltersStorage';
import scenarioFiltersStorage from './filters/scenarioFiltersStorage';
import stepFiltersStorage from './filters/stepFiltersStorage';
import { default as createStorageMiddleware } from './browserStorage/createMiddleware';
import {default as createWebSocketMiddleware} from './websocket/createMiddleware';
import pageScrollMiddleware from './pageScrollMiddleware';
import { loadingIndicatorMiddleware } from './loadingIndicator/redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  createWebSocketMiddleware('PRESENCE'),
  createStorageMiddleware(featureFiltersStorage, state => state.featureFilters),
  createStorageMiddleware(statsDashboardFiltersStorage, state => state.statsDashboardFilters),
  createStorageMiddleware(historyFiltersStorage, state => state.historyFilters),
  createStorageMiddleware(scenarioFiltersStorage, state => state.scenarioFilters),
  createStorageMiddleware(stepFiltersStorage, state => state.stepFilters),
  routerMiddleware(browserHistory),
  pageScrollMiddleware(),
  thunkMiddleware,
  promiseMiddleware(),
  loadingIndicatorMiddleware(),
];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.info('%c ❄️ Using the freeze middleware. Bad mutable store updates will be detected!', 'font-weight: bold');
  middlewares.push(freezeMiddleware);
}

const initialState = {};

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

const history = syncHistoryWithStore(browserHistory, store);

export default store;
export { history };
