import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { testRuns } from './testRuns/redux';


const reducer = combineReducers({
  routing: routerReducer,
  testRuns,
});

export default reducer;
