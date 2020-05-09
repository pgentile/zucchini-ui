import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Status from "../../ui/components/Status";
import truncate from "lodash/truncate";

export default class FailuresTable extends React.Component {
  static propTypes = {
    failures: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { failures } = this.props;
    const rows = failures.map((groupedFailures) => {
      const nbFailedScenarii = groupedFailures.failedScenarii.length;
      return groupedFailures.failedScenarii.map((failedScenario, index) => {
        return (
          <FailuresTableRow
            key={index}
            failedScenario={failedScenario}
            isFirstFailure={index === 0}
            nbFailedScenarii={nbFailedScenarii}
          />
        );
      });
    });

    return (
      <Table bordered striped hover style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th className="col-md-4">Erreur</th>
            <th className="col-md-6">Scénario</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Analysé</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class FailuresTableRow extends React.Component {
  static propTypes = {
    failedScenario: PropTypes.object.isRequired,
    isFirstFailure: PropTypes.bool.isRequired,
    nbFailedScenarii: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showErrorMsgDetails: false
    };
  }

  onShowErrorMsg = () => {
    this.setState({
      showErrorMsgDetails: true
    });
  };

  onHideErrorMsg = () => {
    this.setState({
      showErrorMsgDetails: false
    });
  };

  createErrorMessageCell(rowSpan, errorMessage) {
    const cellStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis"
    };

    return (
      <td rowSpan={rowSpan} style={cellStyle}>
        {truncate(errorMessage, { length: 300 })}
        <br />
        <a onClick={this.onShowErrorMsg}>
          <b>Détails</b>
        </a>
        <FailuresDetailsDialog
          errorMessage={errorMessage}
          show={this.state.showErrorMsgDetails}
          onClose={this.onHideErrorMsg}
        />
      </td>
    );
  }

  render() {
    const { failedScenario, isFirstFailure, nbFailedScenarii } = this.props;

    let errorMessageRow;
    if (isFirstFailure) {
      errorMessageRow = this.createErrorMessageCell(nbFailedScenarii, failedScenario.errorMessage);
    }
    return (
      <tr key={failedScenario}>
        {errorMessageRow}
        <td>
          <Link to={`/scenarios/${failedScenario.id}`}>
            <b>{failedScenario.info.keyword}</b> {failedScenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={failedScenario.status} />
        </td>
        <td>
          <Badge variant={failedScenario.reviewed ? "success" : "light"}>
            {failedScenario.reviewed ? "Oui" : "Non"}
          </Badge>
        </td>
      </tr>
    );
  }
}

class FailuresDetailsDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  };

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  render() {
    const { show, errorMessage } = this.props;
    return (
      <Modal bsSize="large" dialogClassName="details-modal-dialog" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>{"Détails de l'erreur"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{errorMessage}</pre>
        </Modal.Body>
      </Modal>
    );
  }
}
