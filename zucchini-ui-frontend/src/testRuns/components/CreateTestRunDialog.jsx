import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";
import { createTestRun } from "../redux";
import TestRunForm, { TestRunFormFields } from "../../testRun/components/TestRunForm";
import useUniqueId from "../../useUniqueId";

export default function CreateTestRunDialog({ show, currentSelectedType, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(createTestRun(values));

    const createdTestRun = result.value;
    navigate(`/test-runs/${createdTestRun.id}`);
  };

  const titleId = useUniqueId();

  return (
    <Modal show={show} onHide={handleCloseClick} size="lg" aria-labelledby={titleId}>
      <TestRunForm initialValues={{ type: currentSelectedType ?? "" }} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id={titleId}>Créer un tir</Modal.Title>
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
