import { default as featuresApi } from "../api/features";
import { default as scenariosApi } from "../api/scenarios";

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

export function deleteFeature({ featureId }) {
  return featuresApi.deleteFeature({ featureId });
}

export function createStatsWithZeros() {
  const zeroStatsNumbers = {
    count: 0,
    passed: 0,
    failed: 0,
    pending: 0,
    notRun: 0
  };

  return {
    all: { ...zeroStatsNumbers },
    reviewed: { ...zeroStatsNumbers },
    nonReviewed: { ...zeroStatsNumbers }
  };
}
