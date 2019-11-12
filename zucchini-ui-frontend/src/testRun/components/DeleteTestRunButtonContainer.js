import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DeleteTestRunButton from "./DeleteTestRunButton";
import { deleteTestRun } from "../redux";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: async ({ testRunId }) => {
      await dispatch(deleteTestRun({ testRunId }));
      ownProps.history.replace(`/`);
    }
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(DeleteTestRunButton));
