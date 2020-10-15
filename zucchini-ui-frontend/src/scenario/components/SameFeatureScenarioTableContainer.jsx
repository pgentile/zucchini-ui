import { memo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ScenarioTable from "../../ui/components/ScenarioTable";

function SameFeatureScenarioTableContainer() {
  const { scenarioId } = useParams();
  const scenarios = useSelector((state) => state.feature.scenarios);
  return <ScenarioTable scenarios={scenarios} selectedScenarioId={scenarioId} />;
}

export default memo(SameFeatureScenarioTableContainer);
