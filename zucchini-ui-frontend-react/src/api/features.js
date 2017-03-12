import queryString from 'query-string';

import configuration from '../configuration';


class FeaturesApi {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  getFeature({ featureId }) {
    return fetch(`${this.baseUri}/api/features/${featureId}`)
      .then(response => {
        return response.json();
      });
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

  getFeatureHistory({ featureId }) {
    return fetch(`${this.baseUri}/api/features/${featureId}/history`)
      .then(response => {
        return response.json();
      });
  }

}

const features = new FeaturesApi(configuration.ui.backendBaseUri);

export default features;
