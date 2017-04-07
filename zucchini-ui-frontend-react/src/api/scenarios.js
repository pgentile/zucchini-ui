import Client from './Client';


class ScenariosApi {

  constructor(baseUri) {
    this.client = new Client(`${baseUri}/api/scenarii`);
  }

  getScenarios({ featureId, testRunId, search }) {
    return this.client.get({
      query: {
        featureId,
        testRunId,
        search,
      },
    });
  }

  getScenario({ scenarioId }) {
    return this.client.get({
      path: scenarioId,
    });
  }

  getStats({ testRunId, featureId }) {
    return this.client.get({
      path: '/stats',
      query: {
        testRunId,
        featureId,
      },
    });
  }

  getScenarioHistory({ scenarioId }) {
    return this.client.get({ path: `/${scenarioId}/history` });
  }

  getComments({ scenarioId }) {
    return this.client.get({ path: `/${scenarioId}/comments` });
  }

  updateScenarioState({ scenarioId, newState }) {
    return this.client.patch({
      path: scenarioId,
      body: newState,
      hasOutput: false,
    });
  }

  addComment({ scenarioId, comment }) {
    return this.client.post({
      path: `/${scenarioId}/comments/create`,
      body: { content: comment },
      hasOutput: false,
    });
  }

  deleteScenario({ scenarioId }) {
    return this.client.delete({
      path: scenarioId,
      hasOutput: false,
    });
  }

}

const scenarios = new ScenariosApi(configuration.ui.backendBaseUri);

export default scenarios;
