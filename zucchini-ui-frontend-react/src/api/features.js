import queryString from 'query-string';

import configuration from '../configuration';


class FeaturesApi {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  getFeatures({ testRunId, withStats }) {
    const queryParams = queryString.stringify({
      testRunId,
      withStats,
    });

    return fetch(`${this.baseUri}/api/features?${queryParams}`)
      .then(response => {
        return response.json();
      });
  }

}

const features = new FeaturesApi(configuration.ui.backendBaseUri);

export default features;
