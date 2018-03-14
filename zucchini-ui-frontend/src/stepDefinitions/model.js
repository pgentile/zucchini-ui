import { default as scenariosApi } from '../api/scenarios';

export function getStepDefinitions({ testRunId }) {
  return scenariosApi.getStepDefinitions({ testRunId });
}
