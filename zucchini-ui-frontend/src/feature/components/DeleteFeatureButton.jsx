import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteFeature } from "../redux";

export default function DeleteFeatureButton({ testRunId, featureId }) {
  const dispatch = useDispatch();
  const history = useHistory();

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

DeleteFeatureButton.propTypes = {
  testRunId: PropTypes.string.isRequired,
  featureId: PropTypes.string.isRequired
};
