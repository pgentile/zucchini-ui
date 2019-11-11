import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import UpdateScenarioStateDialog from "./UpdateScenarioStateDialog";
import { updateScenarioStateAndComment } from "../redux";

const selectScenario = createSelector(
  state => state.scenario.scenario,
  scenario => scenario
);

const selectProps = createStructuredSelector({
  scenario: selectScenario
});

const UpdateScenarioStateDialogContainer = connect(selectProps, {
  onUpdateState: updateScenarioStateAndComment
})(UpdateScenarioStateDialog);

export default UpdateScenarioStateDialogContainer;
