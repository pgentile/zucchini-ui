import { memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import Status from "../../ui/components/Status";
import ReviewedStatus from "../../ui/components/ReviewedStatus";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import "./FailuresTable.scss";

function FailuresTable() {
  const failures = useSelector((state) => state.failures.failures);

  const rows = failures.flatMap((failure) => {
    const { errorMessage, failedScenarii: scenarios } = failure;

    const errorColumn = <ErrorMessageColumn errorMessage={errorMessage} rowSpan={scenarios.length} />;

    return scenarios.map((scenario, index) => {
      const isFirstRow = index === 0;
      return <FailuresTableRow key={scenario.id} scenario={scenario} extraColumn={isFirstRow && errorColumn} />;
    });
  });

  return (
    <Table bordered striped responsive>
      <thead>
        <tr>
          <th>Erreur</th>
          <th>Scénario</th>
          <th>Statut</th>
          <th>Analysé</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default memo(FailuresTable);

function FailuresTableRow({ extraColumn, scenario }) {
  return (
    <tr>
      {extraColumn}
      <td>
        <Link to={`/scenarios/${scenario.id}`}>
          <b>{scenario.info.keyword}</b> {scenario.info.name}
        </Link>
      </td>
      <td>
        <Status status={scenario.status} />
      </td>
      <td>
        <ReviewedStatus reviewed={scenario.reviewed} />
      </td>
    </tr>
  );
}

FailuresTableRow.propTypes = {
  extraColumn: PropTypes.node,
  scenario: PropTypes.object.isRequired
};

function ErrorMessageColumn({ errorMessage, rowSpan }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

  return (
    <td rowSpan={rowSpan}>
      <pre className="mb-2 failure-table-error-message-resume">{errorMessage}</pre>
      <ButtonGroup>
        <Button variant="outline-dark" size="sm" onClick={handleShowDetails}>
          Afficher l&apos;erreur&hellip;
        </Button>
      </ButtonGroup>
      <ErrorDetailsDialog errorMessage={errorMessage} show={showDetails} onClose={handleCloseDetails} />
    </td>
  );
}

ErrorMessageColumn.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  rowSpan: PropTypes.number
};

function ErrorDetailsDialog({ show, errorMessage, onClose }) {
  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Détails de l&apos;erreur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre className="m-0">{errorMessage}</pre>
      </Modal.Body>
    </Modal>
  );
}

ErrorDetailsDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
