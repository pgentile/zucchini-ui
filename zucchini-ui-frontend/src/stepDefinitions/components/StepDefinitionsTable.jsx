import PropTypes from "prop-types";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import CounterBadge from "../../ui/components/CounterBadge";
import ElementInfo from "../../ui/components/ElementInfo";
import Button from "../../ui/components/Button";
import { useSelector } from "react-redux";

export default function StepDefinitionsTable() {
  const stepDefinitions = useSelector((state) => state.stepDefinitions.stepDefinitions);

  const rows = stepDefinitions.map((stepDefinition, index) => {
    return <StepDefinitionsRow key={index} occurrences={stepDefinition.occurrences} />;
  });

  return (
    <Table bordered striped hover responsive>
      <thead>
        <tr>
          <th>Définition</th>
          <th>Occurrence</th>
          <th>Réussite</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function StepDefinitionsRow({ occurrences }) {
  const [showVariants, setShowVariants] = useState(false);

  const successCount = occurrences.filter((step) => step.status === "PASSED").length;
  const successRate = Math.floor((successCount / occurrences.length) * 100);

  let variant;
  if (successRate >= 90) {
    variant = "success";
  } else if (successRate >= 50) {
    variant = "warning";
  } else {
    variant = "danger";
  }

  const handleToggleVariants = () => {
    setShowVariants((value) => !value);
  };

  const [firstOccurence] = occurrences;

  return (
    <tr>
      <td>
        <ElementInfo info={firstOccurence.info} />
        <Button variant="outline-dark float-right" size="sm" onClick={handleToggleVariants}>
          Voir les variantes&hellip;
        </Button>
        <StepDefinitionsVariantsDialog occurrences={occurrences} show={showVariants} onClose={handleToggleVariants} />
      </td>
      <td>
        <CounterBadge>{occurrences.length}</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{successRate}&thinsp;%</CounterBadge>
      </td>
    </tr>
  );
}

StepDefinitionsRow.propTypes = {
  occurrences: PropTypes.arrayOf(PropTypes.object).isRequired
};

function StepDefinitionsVariantsDialog({ show, occurrences, onClose }) {
  let variants = [];
  if (show) {
    variants = occurrences.map((occurrence, index) => {
      const isLast = index + 1 === occurrences.length;
      return (
        <p key={index} className={isLast ? "mb-0" : undefined}>
          <ElementInfo info={occurrence.info} />
        </p>
      );
    });
  }

  return (
    <Modal size="lg" dialogClassName="details-modal-dialog" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Variantes connues</Modal.Title>
      </Modal.Header>
      <Modal.Body>{show && variants}</Modal.Body>
    </Modal>
  );
}

StepDefinitionsVariantsDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  occurrences: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
};
