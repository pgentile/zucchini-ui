import React from 'react';
import Label from 'react-bootstrap/lib/Label';


export default class ScenarioStatus extends React.PureComponent {

  render() {
    const { bsStyle, displayLabel } = this.getLabelAndStyle();

    return (
      <Label bsStyle={bsStyle}>{displayLabel}</Label>
    );
  }

  getLabelAndStyle() {
    const { status } = this.props;

    let bsStyle = 'warning';
    let displayLabel = status;

    switch (status) {
    case 'PASSED':
      displayLabel = 'Succès';
      bsStyle = 'success';
      break;
    case 'FAILED':
      displayLabel = 'Échec';
      bsStyle = 'danger';
      break;
    case 'UNDEFINED':
      displayLabel = 'Non défini';
      bsStyle = 'danger';
      break;
    case 'SKIPPED':
      displayLabel = 'Sauté';
      bsStyle = 'default';
      break;
    case 'NOT_RUN':
      displayLabel = 'Non joué';
      bsStyle = 'default';
      break;
    case 'PENDING':
      displayLabel = 'En attente';
      bsStyle = 'warning';
      break;
    case 'PARTIAL':
      displayLabel = 'Partiel';
      bsStyle = 'warning';
      break;

    default:
      break;
    }

    return {
      displayLabel,
      bsStyle
    };
  }

}

ScenarioStatus.propTypes = {
  status: React.PropTypes.string.isRequired,
};
