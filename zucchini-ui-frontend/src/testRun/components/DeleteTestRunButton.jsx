import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteTestRun } from "../redux";

function DeleteTestRunButton() {
  const testRunId = useSelector((state) => state.testRun.testRun.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await dispatch(deleteTestRun({ testRunId }));
    navigate(`/`, { replace: true });
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

export default memo(DeleteTestRunButton);
