import queryString from 'query-string';

import configuration from '../configuration';


class ScenariosApi {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  getScenarios({ featureId }) {
    const queryParams = queryString.stringify({
      featureId,
    });

    return fetch(`${this.baseUri}/api/scenarii?${queryParams}`)
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

}

const scenarios = new ScenariosApi(configuration.ui.backendBaseUri);

export default scenarios;
