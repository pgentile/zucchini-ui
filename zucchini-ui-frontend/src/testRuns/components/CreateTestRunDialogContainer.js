import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CreateTestRunDialog from "./CreateTestRunDialog";
import { createTestRun } from "../redux";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreateTestRun: async newTestRun => {
      const result = await dispatch(createTestRun(newTestRun));
      const createdTestRun = result.value;
      ownProps.history.push(`/test-runs/${createdTestRun.id}`);
    }
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(CreateTestRunDialog));
