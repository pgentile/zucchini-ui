import { memo } from "react";

import TestRunDiffSelectorPage from "./TestRunDiffSelectorPage";
import TestRunDiffResultPage from "./TestRunDiffResultPage";
import useQueryParams from "../../useQueryParams";

function TestRunDiffPage() {
  const { otherTestRunId } = useQueryParams();
  return otherTestRunId ? <TestRunDiffResultPage /> : <TestRunDiffSelectorPage />;
}

export default memo(TestRunDiffPage);
