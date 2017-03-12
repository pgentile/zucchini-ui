import { handleActions } from 'redux-actions';

import featureFiltersStorage from './featureFiltersStorage';
import statsDashboardFiltersStorage from './statsDashboardFiltersStorage';


// Actions

const PREFIX = 'FILTERS';

const UPDATE_FEATURE_FILTERS = `${PREFIX}/UPDATE_FEATURE_FILTERS`;
const UPDATE_STATS_DASHBOARD_FILTERS = `${PREFIX}/UPDATE_STATS_DASHBOARD_FILTERS`;


export function updateFeatureFilters(filters) {
  return {
    type: UPDATE_FEATURE_FILTERS,
    payload: filters,
  };
}


export function updateStatsDashboardFilters(statsDashboard) {
  return {
    type: UPDATE_STATS_DASHBOARD_FILTERS,
    payload: statsDashboard,
  };
}


export const featureFilters = handleActions({

  [UPDATE_FEATURE_FILTERS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),

}, featureFiltersStorage.read());


export const statsDashboardFilters = handleActions({

  [UPDATE_STATS_DASHBOARD_FILTERS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),

}, statsDashboardFiltersStorage.read());
