import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { testRuns } from './testRuns/redux';
import { testRun } from './testRun/redux';


const reducer = combineReducers({
  routing: routerReducer,
  testRuns,
  testRun,
});

export default reducer;
