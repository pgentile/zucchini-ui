import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { selectScenarioFilterFunc } from "../../filters/selectors";
import ScenarioTable from "../../ui/components/ScenarioTable";

const selectScenarios = createSelector(
  (state) => state.feature.scenarios,
  selectScenarioFilterFunc,
  (scenarios, scenarioFilterFunc) => {
    return scenarios.filter(scenarioFilterFunc);
  }
);

export default function ScenarioTableContainer() {
  const scenarios = useSelector(selectScenarios);
  return <ScenarioTable scenarios={scenarios} />;
}
