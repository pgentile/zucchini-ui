import { getTestRun, getFeatures } from "../testRun/redux";

export function loadTestRunReportsPage({ testRunId }: { testRunId: string }) {
  return async (dispatch) => {
    const testRunResult = dispatch(getTestRun({ testRunId }));
    const featuresResult = dispatch(getFeatures({ testRunId }));

    await Promise.all([testRunResult, featuresResult].map((result) => result.unwrap()));
    return null;
  };
}
