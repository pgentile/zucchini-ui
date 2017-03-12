import { default as featuresApi } from '../api/features';
import { default as scenariosApi } from '../api/scenarios';


export function getFeature({ featureId }) {
  return featuresApi.getFeature({ featureId });
}

export function getFeatureStats({ featureId }) {
  return scenariosApi.getStats({ featureId });
}

export function getFeatureHistory({ featureId }) {
  return featuresApi.getFeatureHistory({ featureId });
}

export function getScenarios({ featureId }) {
  return scenariosApi.getScenarios({ featureId });
}

export function createStatsWithZeros() {
  return {
    all: ZERO_STATS_NUMBERS,
    reviewed: ZERO_STATS_NUMBERS,
    nonReviewed: ZERO_STATS_NUMBERS,
  };
}

const ZERO_STATS_NUMBERS = {
  count: 0,
  passed: 0,
  failed: 0,
  pending: 0,
  notRun: 0,
};
