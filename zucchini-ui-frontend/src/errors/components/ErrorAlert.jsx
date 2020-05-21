import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

export default function ErrorAlert({ error, onClearErrors }) {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="danger" dismissible onClose={() => onClearErrors()}>
      <h4>Une erreur a été détectée&hellip;</h4>
      <p className="mb-0">{error}</p>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  error: PropTypes.string,
  onClearErrors: PropTypes.func.isRequired
};
