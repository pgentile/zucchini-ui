import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import AddCommentForm from "./AddCommentForm";
import { addScenarioCommentAndReload } from "../redux";

const selectScenarioId = createSelector(
  (state, ownProps) => ownProps.scenarioId,
  scenarioId => scenarioId
);

const selectProps = createStructuredSelector({
  scenarioId: selectScenarioId
});

const AddCommentFormContainer = connect(selectProps, {
  onAddComment: addScenarioCommentAndReload
})(AddCommentForm);

export default AddCommentFormContainer;
