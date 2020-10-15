import { memo } from "react";
import { useSelector } from "react-redux";

import ScenarioTable from "../../ui/components/ScenarioTable";

function SimilarFailureScenarioTableContainer() {
  const scenarios = useSelector((state) => state.scenario.similarFailureScenarios);
  return <ScenarioTable scenarios={scenarios} />;
}

export default memo(SimilarFailureScenarioTableContainer);
