import { createSelector } from "reselect";

export const selectFeatureFilterFunc = createSelector(
  (state) => state.featureFilters,
  (featureFilters) => {
    const filters = createFeatureFilters(featureFilters);

    if (filters.length) {
      return (feature) => {
        let result = true;

        filters.forEach((filter) => {
          if (result) {
            result = filter(feature);
          }
        });

        return result;
      };
    }

    // Accept all features
    return () => true;
  }
);

export const selectScenarioFilterFunc = createSelector(
  (state) => state.scenarioFilters,
  (scenarioFilters) => {
    const filters = createScenarioFilters(scenarioFilters);

    if (filters.length) {
      return (scenario) => {
        let result = true;

        filters.forEach((filter) => {
          if (result) {
            result = filter(scenario);
          }
        });

        return result;
      };
    }

    // Accept all scenarios
    return () => true;
  }
);

function createFeatureFilters(featureFilters) {
  let filters = [];

  if (!featureFilters.passed) {
    const filter = (feature) => feature.status !== "PASSED";
    filters = [...filters, filter];
  }

  if (!featureFilters.failed) {
    const filter = (feature) => feature.status !== "FAILED";
    filters = [...filters, filter];
  }

  if (!featureFilters.partial) {
    const filter = (feature) => feature.status !== "PARTIAL";
    filters = [...filters, filter];
  }

  if (!featureFilters.notRun) {
    const filter = (feature) => feature.status !== "NOT_RUN";
    filters = [...filters, filter];
  }

  if (!featureFilters.reviewed) {
    const filter = (feature) => feature.stats.nonReviewed.count > 0;
    filters = [...filters, filter];
  }

  if (!featureFilters.notReviewed) {
    const filter = (feature) => feature.stats.nonReviewed.count === 0;
    filters = [...filters, filter];
  }

  return filters;
}

function createScenarioFilters(scenarioFilters) {
  let filters = [];

  if (!scenarioFilters.passed) {
    const filter = (scenario) => scenario.status !== "PASSED";
    filters = [...filters, filter];
  }

  if (!scenarioFilters.failed) {
    const filter = (scenario) => scenario.status !== "FAILED";
    filters = [...filters, filter];
  }

  if (!scenarioFilters.pending) {
    const filter = (scenario) => scenario.status !== "PENDING";
    filters = [...filters, filter];
  }

  if (!scenarioFilters.notRun) {
    const filter = (scenario) => scenario.status !== "NOT_RUN";
    filters = [...filters, filter];
  }

  if (!scenarioFilters.reviewed) {
    const filter = (scenario) => !scenario.reviewed;
    filters = [...filters, filter];
  }

  if (!scenarioFilters.notReviewed) {
    const filter = (scenario) => scenario.reviewed;
    filters = [...filters, filter];
  }

  return filters;
}
