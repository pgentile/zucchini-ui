import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { featureFilters, statsDashboardFilters, historyFilters, scenarioFilters } from './filters/redux';
import { testRuns } from './testRuns/redux';
import { testRun } from './testRun/redux';
import { feature } from './feature/redux';
import { scenario } from './scenario/redux';
import { searchResults } from './search/redux';


const reducer = combineReducers({
  routing: routerReducer,
  featureFilters,
  statsDashboardFilters,
  historyFilters,
  scenarioFilters,
  testRuns,
  testRun,
  feature,
  scenario,
  searchResults,
});

export default reducer;
