import { getTestRun, getFeatures } from '../testRun/redux';


// Actions

// Action creators

export function loadTestRunReportsPage({ testRunId }) {
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));
    const featuresResult$ = dispatch(getFeatures({ testRunId }));

    await testRunResult$;
    await featuresResult$;
    return null;
  };
}



