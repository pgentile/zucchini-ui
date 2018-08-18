import { default as scenariosApi } from "../api/scenarios";

export function search({ search, testRunId }) {
  return scenariosApi.getScenarios({ search, testRunId });
}
