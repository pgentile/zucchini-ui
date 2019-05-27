import Client from "./Client";

class ScenariosApi {
  constructor() {
    this.client = new Client("/api/scenarii");
  }

  getScenarios({ featureId, testRunId, search, tags, excludedTags }) {
    return this.client.get({
      query: {
        featureId,
        testRunId,
        search,
        tag: tags,
        excludedTag: excludedTags
      }
    });
  }

  getScenario({ scenarioId }) {
    return this.client.get({
      path: scenarioId
    });
  }

  getStats({ testRunId, featureId, tags, excludedTags }) {
    return this.client.get({
      path: "/stats",
      query: {
        testRunId,
        featureId,
        tag: tags,
        excludedTag: excludedTags
      }
    });
  }

  getStepDefinitions({ testRunId }) {
    return this.client.get({
      path: "/stepDefinitions",
      query: {
        testRunId
      }
    });
  }

  getFailures({ testRunId }) {
    return this.client.get({
      path: "/failures",
      query: {
        testRunId
      }
    });
  }

  getSimilarFailureScenarios({ scenarioId }) {
    return this.client.get({ path: `/${scenarioId}/associatedFailures` });
  }

  getScenarioHistory({ scenarioId }) {
    return this.client.get({ path: `/${scenarioId}/history` });
  }

  getComments({ scenarioId }) {
    return this.client.get({ path: `/${scenarioId}/comments` });
  }

  deleteComment({ scenarioId, commentId }) {
    return this.client.delete({
      path: `/${scenarioId}/comments/${commentId}`,
      hasOutput: false
    });
  }

  updateComment({ scenarioId, commentId, newContent }) {
    return this.client.patch({
      path: `/${scenarioId}/comments/${commentId}`,
      body: {
        content: newContent
      },
      hasOutput: false
    });
  }

  updateScenarioState({ scenarioId, newState }) {
    return this.client.patch({
      path: scenarioId,
      body: newState,
      hasOutput: false
    });
  }

  addComment({ scenarioId, comment }) {
    return this.client.post({
      path: `/${scenarioId}/comments/create`,
      body: { content: comment },
      hasOutput: false
    });
  }

  deleteScenario({ scenarioId }) {
    return this.client.delete({
      path: scenarioId,
      hasOutput: false
    });
  }
}

const scenarios = new ScenariosApi();

export default scenarios;
