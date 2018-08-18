import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/lib/Alert";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import withPresenceIndicator from "../../presence/components/withPresenceIndicator";

class ScenarioPresenceIndicatorDisplay extends React.PureComponent {
  static propTypes = {
    otherWatcherIds: PropTypes.array
  };

  render() {
    const { otherWatcherIds } = this.props;

    let bsStyle = "warning";
    let glyph = "exclamation-sign";
    let text = "Présence d'utilisateurs en simultané inconnue";

    if (otherWatcherIds !== null) {
      if (otherWatcherIds.length === 0) {
        bsStyle = "success";
        glyph = "ok-sign";
        text = "Vous êtes seul à regarder ce scénario.";
      } else if (otherWatcherIds.length === 1) {
        text = "Une autre personne est en train de regarder ce scénario.";
      } else {
        text = `${otherWatcherIds.length} autres personnes sont en train de regarder ce scénario.`;
      }
    }

    return (
      <Alert bsStyle={bsStyle}>
        <Glyphicon glyph={glyph} /> {text}
      </Alert>
    );
  }
}

const WrappedScenarioPresenceIndicatorDisplay = withPresenceIndicator(ScenarioPresenceIndicatorDisplay);

export default class ScenarioPresenceIndicator extends React.PureComponent {
  static propTypes = {
    scenarioId: PropTypes.string.isRequired
  };

  render() {
    const { scenarioId } = this.props;
    return <WrappedScenarioPresenceIndicatorDisplay referenceType="SCENARIO_ID" reference={scenarioId} />;
  }
}

///// export default withPresenceIndicator(ScenarioPresenceIndicator);
