import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DeleteFeatureButton from "./DeleteFeatureButton";
import { deleteFeature } from "../redux";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: async ({ testRunId, featureId }) => {
      await dispatch(deleteFeature({ featureId }));
      ownProps.history.replace(`/test-runs/${testRunId}`);
    }
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(DeleteFeatureButton));
