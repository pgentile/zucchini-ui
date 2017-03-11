import queryString from 'query-string';

import configuration from '../configuration';


class ScenariosApi {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  getStats({ testRunId }) {
    const queryParams = queryString.stringify({
      testRunId,
    });

    return fetch(`${this.baseUri}/api/scenarii/stats?${queryParams}`)
      .then(response => {
        return response.json();
      });
  }

}

const scenarios = new ScenariosApi(configuration.ui.backendBaseUri);

export default scenarios;
