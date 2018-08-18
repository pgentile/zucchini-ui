import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioTable from "../../ui/components/ScenarioTable";

const selectScenarios = createSelector(state => state.searchResults.foundScenarios, scenarios => scenarios);

const selectProps = createStructuredSelector({
  scenarios: selectScenarios
});

const FoundScenarioTableContainer = connect(selectProps)(ScenarioTable);

export default FoundScenarioTableContainer;
