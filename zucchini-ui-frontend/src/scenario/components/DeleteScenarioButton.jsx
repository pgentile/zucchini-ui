import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { deleteScenario } from "../redux";

export default function DeleteScenarioButton() {
  const { id: scenarioId, featureId } = useSelector((state) => state.scenario.scenario);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await dispatch(deleteScenario({ scenarioId }));
    navigate(`/features/${featureId}`, { replace: true });
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
