import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";
import { createTestRun } from "../redux";
import TestRunForm from "../../testRun/components/TestRunForm";

export default function CreateTestRunDialog({ show, currentSelectedType, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(createTestRun(values));

    onClose();

    const createdTestRun = result.value;
    history.push(`/test-runs/${createdTestRun.id}`);
  };

  const formRef = useRef();

  const handleCreateClick = () => {
    formRef.current.requestSubmit();
  };

  return (
    <Modal show={show} onHide={handleCloseClick} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Créer un tir</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TestRunForm
          ref={formRef}
          initialValues={{ type: currentSelectedType }}
          key={currentSelectedType}
          onSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseClick}>
          Annuler
        </Button>
        <Button onClick={handleCreateClick}>Créer</Button>
      </Modal.Footer>
    </Modal>
  );
}

CreateTestRunDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  currentSelectedType: PropTypes.string,
  onClose: PropTypes.func.isRequired
};
