import { default as scenariosApi } from '../api/scenarios';


export function getScenario({ scenarioId }) {
  return scenariosApi.getScenario({ scenarioId });
}

export function getScenarioHistory({ scenarioId }) {
  return scenariosApi.getScenarioHistory({ scenarioId });
}

export function getScenarioComments({ scenarioId }) {
  return scenariosApi.getComments({ scenarioId });
}
