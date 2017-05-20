import { default as scenariosApi } from '../api/scenarios';
import { default as testRunsApi } from '../api/testRuns';


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

export function getScenarioComments({ scenarioId }) {
  // Load comments, extract references

  const comments$ = scenariosApi.getComments({ scenarioId })
    .then(comments => {
      return comments.map(comment => {
        comment.testRunId = getCommentReference(comment.references, 'TEST_RUN_ID');
        comment.scenarioId = getCommentReference(comment.references, 'SCENARIO_ID');
        comment.scenarioKey = getCommentReference(comment.references, 'SCENARIO_KEY');
        return comment;
      });
    });

  // Load associated test runs

  const testRunsById = new PromiseMapper({
    factory: testRunId => getTestRun({ testRunId }),
  });

  return comments$.then(comments => {
    const commentsWithTestRun$ = comments.map(comment => {

      // Find test run promise, create a new promise if not found
      const testRunId = comment.testRunId;
      const testRun$ = testRunsById.get(testRunId);

      // Attach test run to the comment
      return testRun$.then(testRun => {
        comment.testRun = testRun;
        return comment;
      });
    });

    return Promise.all(commentsWithTestRun$);
  });
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

  constructor({ factory }) {
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
