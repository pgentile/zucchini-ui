import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioStats from "./ScenarioStats";
import { updateStatsDashboardFilters } from "../../filters/redux";

const selectShowDetails = createSelector(
  state => state.statsDashboardFilters.showDetails,
  showDetails => showDetails
);

const selectProps = createStructuredSelector({
  showDetails: selectShowDetails
});

export default connect(selectProps, {
  onToggleDetails: updateStatsDashboardFilters
})(ScenarioStats);
