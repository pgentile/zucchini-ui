import queryString from 'query-string';


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

  deleteFeature({ featureId }) {
    const fetchParams = {
      method: 'DELETE',
    };

    return fetch(`${this.baseUri}/api/features/${featureId}`, fetchParams)
      .then(() => {
        return null;
      });
  }

}

const features = new FeaturesApi(configuration.ui.backendBaseUri);

export default features;
