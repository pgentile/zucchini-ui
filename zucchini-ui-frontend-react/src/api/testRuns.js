import Client from './Client';


class TestRunsApi {

  constructor(baseUri) {
    this.client = new Client(`${baseUri}/api/testRuns`);
  }

  getLatests({ withStats, type }) {
    return this.client.get({
      query: { withStats, type },
    });
  }

  getTestRun({ testRunId }) {
    return this.client.get({ path: testRunId });
  }

  createTestRun({ type }) {
    return this.client.post({
      path: '/create',
      body: { type },
    });
  }

  deleteTestRun({ testRunId }) {
    return this.client.delete({
      path: testRunId,
      hasOutput: false,
    });
  }

}

const testRuns = new TestRunsApi(configuration.ui.backendBaseUri);

export default testRuns;
