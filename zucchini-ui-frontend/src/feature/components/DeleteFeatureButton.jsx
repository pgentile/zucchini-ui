import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteFeature } from "../redux";

export default function DeleteFeatureButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const feature = useSelector((state) => state.feature.feature);
  const { testRunId, id: featureId } = feature;

  const handleDelete = async () => {
    await dispatch(deleteFeature({ featureId }));
    history.replace(`/test-runs/${testRunId}`);
  };

  return (
    <ConfirmActionButton
      variant="danger"
      actionIcon={faTimesCircle}
      actionLabel="Supprimer"
      title="Supprimer la fonctionnalité"
      message="La suppression est irreversible. Êtes-vous sûr de supprimer cette fonctionnalité ?"
      onConfirm={handleDelete}
    />
  );
}
