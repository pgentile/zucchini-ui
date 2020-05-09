import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";

import Button from "../../ui/components/Button";
import { createTestRun } from "../redux";

export default function CreateTestRunDialog({ currentSelectedType, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [type, setType] = useState(currentSelectedType ?? "");
  const [environment, setEnvironment] = useState("");
  const [name, setName] = useState("");

  const handleTypeChange = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleEnvironmentChange = (event) => {
    event.preventDefault();
    setEnvironment(event.target.value);
  };

  const handleCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  const handleCreateTestRun = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const result = await dispatch(
      createTestRun({
        type,
        environment,
        name
      })
    );

    onClose();

    const createdTestRun = result.value;
    history.push(`/test-runs/${createdTestRun.id}`);
  };

  return (
    <Modal show onHide={handleCloseClick}>
      <Modal.Header closeButton>
        <Modal.Title>Créer un tir</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleCreateTestRun}>
          <FormGroup controlId="type">
            <FormLabel>Type</FormLabel>
            <FormControl type="text" autoFocus value={type} onChange={handleTypeChange} />
          </FormGroup>
          <FormGroup controlId="environment">
            <FormLabel>Environnement</FormLabel>
            <FormControl type="text" value={environment} onChange={handleEnvironmentChange} />
          </FormGroup>
          <FormGroup controlId="name">
            <FormLabel>Nom</FormLabel>
            <FormControl type="text" value={name} onChange={handleNameChange} />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseClick}>Annuler</Button>
        <Button variant="primary" onClick={handleCreateTestRun}>
          Créer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CreateTestRunDialog.propTypes = {
  currentSelectedType: PropTypes.string,
  onClose: PropTypes.func.isRequired
};
