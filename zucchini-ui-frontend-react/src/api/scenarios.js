import queryString from 'query-string';


class ScenariosApi {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  getScenarios({ featureId, testRunId, search }) {
    const queryParams = queryString.stringify({
      featureId,
      testRunId,
      search,
    });

    return fetch(`${this.baseUri}/api/scenarii?${queryParams}`)
      .then(response => {
        return response.json();
      });
  }

  getScenario({ scenarioId }) {
    return fetch(`${this.baseUri}/api/scenarii/${scenarioId}`)
      .then(response => {
        return response.json();
      });
  }

  getStats({ testRunId, featureId }) {
    const queryParams = queryString.stringify({
      testRunId,
      featureId,
    });

    return fetch(`${this.baseUri}/api/scenarii/stats?${queryParams}`)
      .then(response => {
        return response.json();
      });
  }

  getScenarioHistory({ scenarioId }) {
    return fetch(`${this.baseUri}/api/scenarii/${scenarioId}/history`)
      .then(response => {
        return response.json();
      });
  }

  getComments({ scenarioId }) {
    return fetch(`${this.baseUri}/api/scenarii/${scenarioId}/comments`)
      .then(response => {
        return response.json();
      });
  }

  updateScenarioState({ scenarioId, newState }) {
    const fetchParams = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newState),
    };

    return fetch(`${this.baseUri}/api/scenarii/${scenarioId}`, fetchParams)
      .then(() => null);
  }

  addComment({ scenarioId, comment }) {
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: comment }),
    };

    return fetch(`${this.baseUri}/api/scenarii/${scenarioId}/comments/create`, fetchParams)
      .then(() => null);
  }

  deleteScenario({ scenarioId }) {
    const fetchParams = {
      method: 'DELETE',
    };

    return fetch(`${this.baseUri}/api/scenarii/${scenarioId}`, fetchParams)
      .then(() => {
        return null;
      });
  }

}

const scenarios = new ScenariosApi(configuration.ui.backendBaseUri);

export default scenarios;
