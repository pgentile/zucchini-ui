import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteScenario } from "../redux";

export default function DeleteScenarioButton() {
  const { id: scenarioId, featureId } = useSelector((state) => state.scenario.scenario);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(deleteScenario({ scenarioId }));
    history.replace(`/features/${featureId}`);
  };

  return (
    <ConfirmActionButton
      variant="danger"
      actionIcon={faTimesCircle}
      actionLabel="Supprimer"
      title="Supprimer le scénario"
      message="La suppression est irreversible. Êtes-vous sûr de supprimer ce scénario ?"
      onConfirm={handleDelete}
    />
  );
}
