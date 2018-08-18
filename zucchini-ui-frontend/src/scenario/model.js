import { default as scenariosApi } from "../api/scenarios";
import { default as testRunsApi } from "../api/testRuns";

export function getScenario({ scenarioId }) {
  return scenariosApi.getScenario({ scenarioId });
}

export function getScenarioHistory({ scenarioId }) {
  return scenariosApi.getScenarioHistory({ scenarioId });
}

export function getSimilarFailureScenarios({ scenarioId }) {
  return scenariosApi.getSimilarFailureScenarios({ scenarioId });
}

export function updateScenarioState({ scenarioId, newState }) {
  return scenariosApi.updateScenarioState({ scenarioId, newState });
}

export function addScenarioComment({ scenarioId, comment }) {
  return scenariosApi.addComment({ scenarioId, comment });
}

export function deleteScenario({ scenarioId }) {
  return scenariosApi.deleteScenario({ scenarioId });
}

export async function getScenarioComments({ scenarioId }) {
  // Load comments, extract references

  let comments = await scenariosApi.getComments({ scenarioId });
  comments = comments.map(comment => {
    return {
      ...comment,
      testRunId: getCommentReference(comment.references, "TEST_RUN_ID"),
      scenarioId: getCommentReference(comment.references, "SCENARIO_ID"),
      scenarioKey: getCommentReference(comment.references, "SCENARIO_KEY")
    };
  });

  // Load associated test runs

  const testRunsById = new PromiseMapper(testRunId => getTestRun({ testRunId }));

  const commentsWithTestRun$ = comments.map(async comment => {
    const testRun = await testRunsById.get(comment.testRunId);
    return {
      ...comment,
      testRun
    };
  });

  return Promise.all(commentsWithTestRun$);
}

export function deleteComment({ scenarioId, commentId }) {
  return scenariosApi.deleteComment({ scenarioId, commentId });
}

export function updateComment({ scenarioId, commentId, newContent }) {
  return scenariosApi.updateComment({ scenarioId, commentId, newContent });
}

function getTestRun({ testRunId }) {
  return testRunsApi.getTestRun({ testRunId }).catch(() => null);
}

function getCommentReference(references, referenceType) {
  const selectedReferences = references.filter(reference => reference.type === referenceType);
  if (selectedReferences.length > 0) {
    return selectedReferences[0].reference;
  }
  return null;
}

class PromiseMapper {
  constructor(factory) {
    this.factory = factory;
    this.promises$ = new Map();
  }

  get(key) {
    let promise$ = this.promises$.get(key);
    if (promise$ === undefined) {
      promise$ = this.factory(key);
      this.promises$.set(key, promise$);
    }
    return promise$;
  }
}
