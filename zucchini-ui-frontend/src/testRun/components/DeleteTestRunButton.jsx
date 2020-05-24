import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteTestRun } from "../redux";

export default function DeleteTestRunButton({ testRunId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(deleteTestRun({ testRunId }));
    history.replace(`/`);
  };

  return (
    <ConfirmActionButton
      variant="danger"
      actionIcon={faTimesCircle}
      actionLabel="Supprimer"
      title="Supprimer le tir"
      message="La suppression est irreversible. Êtes-vous sûr de supprimer ce tir ?"
      onConfirm={handleDelete}
    />
  );
}

DeleteTestRunButton.propTypes = {
  testRunId: PropTypes.string
};
