import { memo } from "react";
import { useSelector } from "react-redux";

import ScenarioStats from "../../stats/components/ScenarioStats";

function FeatureStats() {
  const stats = useSelector((state) => state.feature.stats);

  return <ScenarioStats stats={stats} />;
}

export default memo(FeatureStats);
