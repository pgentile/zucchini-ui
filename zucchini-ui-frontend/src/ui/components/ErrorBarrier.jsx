import { Component } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

import useUniqueId from "../../useUniqueId";

export default class ErrorBarrier extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
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
    const { name, children, className } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return <ErrorBarrierAlert name={name} errorMessage={errorMessage} className={className} />;
    }
    return children;
  }
}

function ErrorBarrierAlert({ name, errorMessage, className }) {
  const titleId = useUniqueId();

  return (
    <Alert variant="danger" tabIndex={-1} className={className} data-name={name} aria-labelledby={titleId}>
      <h4 id={titleId}>Une erreur fatale s&apos;est produite&hellip;</h4>
      <p>{errorMessage}</p>
      <hr />
      <p className="mb-0">
        Vous pouvez tenter de <Alert.Link href={window.location.href}>recharger la page</Alert.Link>.
      </p>
    </Alert>
  );
}

ErrorBarrierAlert.propTypes = {
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  className: PropTypes.string
};
