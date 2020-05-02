import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteScenario } from "../redux";

export default function DeleteScenarioButton({ featureId, scenarioId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(deleteScenario({ scenarioId }));
    history.replace(`/features/${featureId}`);
  };

  return (
    <ConfirmActionButton
      bsStyle="danger"
      actionGlyph="remove"
      actionLabel="Supprimer"
      title="Supprimer le scénario"
      message="La suppression est irreversible. Êtes-vous sûr de supprimer ce scénario ?"
      onConfirm={handleDelete}
    />
  );
}

DeleteScenarioButton.propTypes = {
  featureId: PropTypes.string.isRequired,
  scenarioId: PropTypes.string.isRequired
};
