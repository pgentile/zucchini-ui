import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { featureFilters, statsDashboardFilters, historyFilters, scenarioFilters, stepFilters } from './filters/redux';
import { testRuns } from './testRuns/redux';
import { testRun } from './testRun/redux';
import { feature } from './feature/redux';
import { scenario } from './scenario/redux';
import { tags } from './tags/redux';
import { tagDetails } from './tagDetails/redux';
import { searchResults } from './search/redux';
import { errors } from './errors/redux';


const reducer = combineReducers({
  routing: routerReducer,
  featureFilters,
  statsDashboardFilters,
  historyFilters,
  scenarioFilters,
  stepFilters,
  testRuns,
  testRun,
  feature,
  scenario,
  tags,
  tagDetails,
  searchResults,
  errors,
});

export default reducer;
