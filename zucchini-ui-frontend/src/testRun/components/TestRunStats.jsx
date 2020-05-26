import React, { memo } from "react";
import { useSelector } from "react-redux";

import ScenarioStats from "../../stats/components/ScenarioStats";

function TestRunStats() {
  const stats = useSelector((state) => state.testRun.stats);

  return <ScenarioStats stats={stats} />;
}

export default memo(TestRunStats);
