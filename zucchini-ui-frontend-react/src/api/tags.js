import Client from './Client';


class TagsApi {

  constructor(baseUri) {
    this.client = new Client(`${baseUri}/api/scenarii/tags`);
  }

  getTags({ testRunId }) {
    return this.client.get({
      query: {
        testRunId,
      },
    });
  }

}

const tags = new TagsApi(configuration.backendBaseUri);

export default tags;
