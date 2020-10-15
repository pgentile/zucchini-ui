import PropTypes from "prop-types";
import { PureComponent } from "react";
import Badge from "react-bootstrap/Badge";

export default class Status extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired
  };

  getLabelAndStyle() {
    const { status } = this.props;

    let variant = "warning";
    let displayLabel = status;

    switch (status) {
      case "PASSED":
        displayLabel = "Succès";
        variant = "success";
        break;
      case "FAILED":
        displayLabel = "Échec";
        variant = "danger";
        break;
      case "UNDEFINED":
        displayLabel = "Non défini";
        variant = "danger";
        break;
      case "SKIPPED":
        displayLabel = "Sauté";
        variant = "light";
        break;
      case "NOT_RUN":
        displayLabel = "Non joué";
        variant = "dark";
        break;
      case "PENDING":
        displayLabel = "En attente";
        variant = "warning";
        break;
      case "PARTIAL":
        displayLabel = "Partiel";
        variant = "warning";
        break;

      default:
        break;
    }

    return {
      displayLabel,
      variant
    };
  }

  render() {
    const { variant, displayLabel } = this.getLabelAndStyle();

    return <Badge variant={variant}>{displayLabel}</Badge>;
  }
}
