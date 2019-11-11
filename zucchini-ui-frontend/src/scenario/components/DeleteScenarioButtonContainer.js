import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DeleteScenarioButton from "./DeleteScenarioButton";
import { deleteScenario } from "../redux";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: async ({ scenarioId, featureId }) => {
      await dispatch(deleteScenario({ scenarioId }));
      ownProps.history.replace(`/features/${featureId}`);
    }
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(DeleteScenarioButton));
