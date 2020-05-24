import PropTypes from "prop-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";
import { TestRunForm, TestRunFormFields } from "./TestRunForm";
import { editTestRunThenReload } from "../redux";

export default function EditTestRunDialog({ show, onClose }) {
  const testRun = useSelector((state) => state.testRun.testRun);

  const dispatch = useDispatch();

  const handleCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  const handleSubmit = async (values) => {
    await dispatch(
      editTestRunThenReload({
        ...values,
        testRunId: testRun.id
      })
    );
    onClose();
  };

  return (
    <Modal show={show} onHide={handleCloseClick} size="lg">
      <TestRunForm initialValues={testRun} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations du tir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TestRunFormFields />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClick}>
            Annuler
          </Button>
          <Button type="submit">Modifier</Button>
        </Modal.Footer>
      </TestRunForm>
    </Modal>
  );
}

EditTestRunDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  currentSelectedType: PropTypes.string,
  onClose: PropTypes.func.isRequired
};
