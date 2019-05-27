import Client from "./Client";

class TagsApi {
  constructor() {
    this.client = new Client("/api/scenarii/tags");
  }

  getTags({ testRunId }) {
    return this.client.get({
      query: {
        testRunId
      }
    });
  }
}

const tags = new TagsApi();

export default tags;
