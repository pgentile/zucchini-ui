import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { featureFilters, statsDashboardFilters } from './filters/redux';

import { testRuns } from './testRuns/redux';
import { testRun } from './testRun/redux';
import { feature } from './feature/redux';


const reducer = combineReducers({
  routing: routerReducer,
  testRuns,
  testRun,
  feature,
  featureFilters,
  statsDashboardFilters,
});

export default reducer;
