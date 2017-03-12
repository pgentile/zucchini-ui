import { handleActions } from 'redux-actions';

import featureFiltersStorage from './featureFiltersStorage';


// Actions

const PREFIX = 'FILTERS';

const UPDATE_FEATURE_FILTERS = `${PREFIX}/UPDATE_FEATURE_FILTERS`;


export function updateFeatureFilters(filters) {
  return {
    type: UPDATE_FEATURE_FILTERS,
    payload: filters,
  };
}

export const featureFilters = handleActions({

  [UPDATE_FEATURE_FILTERS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),

}, featureFiltersStorage.read());
