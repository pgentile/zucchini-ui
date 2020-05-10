import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import usePresenceIndicator from "../../presence/usePresenceIndicator";

export default function ScenarioPresenceIndicator({ scenarioId }) {
  usePresenceIndicator({ referenceType: "SCENARIO_ID", reference: scenarioId });

  const otherWatcherIds = useSelector((state) => state.presence.otherWatcherIds);

  let variant = "warning";
  let icon = "exclamation-sign";
  let text = "Présence d'utilisateurs en simultané inconnue";

  if (otherWatcherIds !== null) {
    if (otherWatcherIds.length === 0) {
      variant = "success";
      icon = "check-circle";
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

ScenarioPresenceIndicator.propTypes = {
  scenarioId: PropTypes.string.isRequired
};
