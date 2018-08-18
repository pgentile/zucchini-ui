import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/lib/Alert";

export default class ErrorAlert extends React.PureComponent {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    onClearErrors: PropTypes.func.isRequired
  };

  onClearErrors = () => {
    this.props.onClearErrors();
  };

  render() {
    const { errors } = this.props;
    const errorCount = errors.length;

    if (errorCount === 0) {
      return null;
    }

    const firstError = errors[0];
    //const remainingErrors = errorCount - 1;

    return (
      <Alert bsStyle="danger" onDismiss={this.onClearErrors}>
        <h4>Une erreur a été détectée&hellip;</h4>
        <p>{firstError}</p>
      </Alert>
    );
  }
}
