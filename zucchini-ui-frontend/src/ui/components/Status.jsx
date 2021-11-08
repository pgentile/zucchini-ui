import PropTypes from "prop-types";
import Badge from "react-bootstrap/Badge";

export default function Status({ status }) {
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

  return <Badge variant={variant}>{displayLabel}</Badge>;
}

Status.propTypes = {
  status: PropTypes.string.isRequired
};
