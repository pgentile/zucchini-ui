import { connect } from "react-redux";

import UpdateScenarioReviewedStateDialog from "./UpdateScenarioReviewedStateDialog";
import { setScenarioReviewedStateAndComment } from "../redux";

const UpdateScenarioReviewedStateDialogContainer = connect(null, {
  onSetReviewedState: setScenarioReviewedStateAndComment
})(UpdateScenarioReviewedStateDialog);

export default UpdateScenarioReviewedStateDialogContainer;
