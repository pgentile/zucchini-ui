import { getTestRun, getFeatures } from '../testRun/redux';


// Actions

/*const PREFIX = 'REPORTS';
const GET_REPORTS = `${PREFIX}/GET_REPORTS`;
const GET_REPORTS_FULFILLED = `${GET_REPORTS}_FULFILLED`;*/

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



