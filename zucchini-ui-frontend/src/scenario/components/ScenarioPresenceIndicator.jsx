import { memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import usePresenceIndicator from "../../presence/usePresenceIndicator";

function ScenarioPresenceIndicator() {
  const { scenarioId } = useParams();
  usePresenceIndicator({ referenceType: "SCENARIO_ID", reference: scenarioId });

  const otherWatcherIds = useSelector((state) => state.presence.otherWatcherIds);

  let variant = "warning";
  let icon = faExclamationTriangle;
  let text = "Présence d'utilisateurs en simultané inconnue";

  if (otherWatcherIds !== null) {
    if (otherWatcherIds.length === 0) {
      variant = "success";
      icon = faCheckCircle;
      text = "Vous êtes seul à regarder ce scénario.";
    } else if (otherWatcherIds.length === 1) {
      text = "Une autre personne est en train de regarder ce scénario.";
    } else {
      text = `${otherWatcherIds.length} autres personnes sont en train de regarder ce scénario.`;
    }
  }

  return (
    <Alert variant={variant}>
      <FontAwesomeIcon icon={icon} /> {text}
    </Alert>
  );
}

export default memo(ScenarioPresenceIndicator);
