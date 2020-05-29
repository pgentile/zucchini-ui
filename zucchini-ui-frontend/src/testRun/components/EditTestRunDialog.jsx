import PropTypes from "prop-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";
import TestRunForm, { TestRunFormFields } from "./TestRunForm";
import { editTestRunThenReload } from "../redux";
import useUniqueId from "../../useUniqueId";

export default function EditTestRunDialog({ show, onClose }) {
  const testRun = useSelector((state) => state.testRun.testRun);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(
      editTestRunThenReload({
        ...values,
        testRunId: testRun.id
      })
    );
    onClose();
  };

  const titleId = useUniqueId();

  return (
    <Modal show={show} onHide={onClose} size="lg" aria-labelledby={titleId}>
      <TestRunForm initialValues={testRun} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id={titleId}>Modifier les informations du tir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TestRunFormFields />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
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
