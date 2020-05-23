import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

export default class ErrorBarrier extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    hasError: false,
    errorMessage: null
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: `${error}`
    };
  }

  render() {
    const { children } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <Alert variant="danger" tabIndex={0}>
          <h4>Une erreur fatale s&apos;est produite&hellip;</h4>
          <p>{errorMessage}</p>
          <hr />
          <p className="mb-0">
            Vous pouvez tenter de <Alert.Link href={window.location.href}>recharger la page</Alert.Link>.
          </p>
        </Alert>
      );
    }

    return children;
  }
}
