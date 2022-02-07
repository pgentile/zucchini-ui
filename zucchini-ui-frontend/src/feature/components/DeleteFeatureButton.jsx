import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteFeature } from "../redux";

export default function DeleteFeatureButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feature = useSelector((state) => state.feature.feature);
  const { testRunId, id: featureId } = feature;

  const handleDelete = async () => {
    await dispatch(deleteFeature({ featureId }));
    navigate(`/test-runs/${testRunId}`, { replace: true });
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
