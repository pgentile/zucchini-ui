import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";
import { createTestRun } from "../redux";
import { TestRunForm, TestRunFormFields } from "../../testRun/components/TestRunForm";

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

  return (
    <Modal show={show} onHide={handleCloseClick} size="lg">
      <TestRunForm initialValues={{ type: currentSelectedType }} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un tir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TestRunFormFields />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClick}>
            Annuler
          </Button>
          <Button type="submit">Créer</Button>
        </Modal.Footer>
      </TestRunForm>
    </Modal>
  );
}

CreateTestRunDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  currentSelectedType: PropTypes.string,
  onClose: PropTypes.func.isRequired
};
