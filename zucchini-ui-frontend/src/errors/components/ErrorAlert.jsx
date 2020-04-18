import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/lib/Alert";

export default function ErrorAlert({ error, onClearErrors }) {
  if (!error) {
    return null;
  }

  return (
    <Alert bsStyle="danger" onDismiss={() => onClearErrors()}>
      <h4>Une erreur a été détectée&hellip;</h4>
      <p>{error}</p>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  error: PropTypes.string,
  onClearErrors: PropTypes.func.isRequired
};
