import { default as scenariosApi } from '../api/scenarios';


export function getScenario({ scenarioId }) {
  return scenariosApi.getScenario({ scenarioId });
}
