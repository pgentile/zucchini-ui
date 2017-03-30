import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';
import featureFiltersStorage from './filters/featureFiltersStorage';
import statsDashboardFiltersStorage from './filters/statsDashboardFiltersStorage';
import historyFiltersStorage from './filters/historyFiltersStorage';
import scenarioFiltersStorage from './filters/scenarioFiltersStorage';
import stepFiltersStorage from './filters/stepFiltersStorage';
import { default as createStorageMiddleware } from './browserStorage/createMiddleware';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  createStorageMiddleware(featureFiltersStorage, state => state.featureFilters),
  createStorageMiddleware(statsDashboardFiltersStorage, state => state.statsDashboardFilters),
  createStorageMiddleware(historyFiltersStorage, state => state.historyFilters),
  createStorageMiddleware(scenarioFiltersStorage, state => state.scenarioFilters),
  createStorageMiddleware(stepFiltersStorage, state => state.stepFilters),
  routerMiddleware(browserHistory),
  thunkMiddleware,
  promiseMiddleware(),
];

const initialState = {};

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

const history = syncHistoryWithStore(browserHistory, store);

export default store;
export { history };
