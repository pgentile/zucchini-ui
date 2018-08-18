import Client from "./Client";

class FeaturesApi {
  constructor(baseUri) {
    this.client = new Client(`${baseUri}/api/features`);
  }

  getFeature({ featureId }) {
    return this.client.get({ path: featureId });
  }

  getFeatures({ testRunId, withStats, tags, excludedTags }) {
    return this.client.get({
      query: {
        testRunId,
        withStats,
        tag: tags,
        excludedTag: excludedTags
      }
    });
  }

  getFeatureHistory({ featureId }) {
    return this.client.get({ path: `${featureId}/history` });
  }

  deleteFeature({ featureId }) {
    return this.client.delete({
      path: featureId,
      hasOutput: false
    });
  }
}

const features = new FeaturesApi(configuration.backendBaseUri);

export default features;
