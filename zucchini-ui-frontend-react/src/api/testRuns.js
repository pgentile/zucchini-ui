import queryString from 'query-string';

import configuration from '../configuration';


class TestRunsApi {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  getLatests({ withStats }) {
    const queryParams = queryString.stringify({
      withStats
    });

    return fetch(`${this.baseUri}/api/testRuns?${queryParams}`)
      .then(response => {
        return response.json();
      });
  }

}

const testRuns = new TestRunsApi(configuration.ui.backendBaseUri);

export default testRuns;
