import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { featureFilters, statsDashboardFilters } from './filters/redux';
import { testRuns } from './testRuns/redux';
import { testRun } from './testRun/redux';
import { feature } from './feature/redux';
import { scenario } from './scenario/redux';


const reducer = combineReducers({
  routing: routerReducer,
  featureFilters,
  statsDashboardFilters,
  testRuns,
  testRun,
  feature,
  scenario,
});

export default reducer;
