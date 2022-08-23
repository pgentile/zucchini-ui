import { useEffect, useId, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import Button from "../../ui/components/Button";
import { editFeatureState } from "../redux";

export default function EditFeatureDialog({ show, onClose }) {
  const feature = useSelector((state) => state.feature.feature);

  const [values, setValues] = useState({
    group: ""
  });

  const { group } = values;

  useEffect(() => {
    setValues((currentValues) => {
      return {
        ...currentValues,
        group: feature.group ?? ""
      };
    });
  }, [feature]);

  const handleValueChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value
      };
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      editFeatureState({
        featureId: feature.id,
        group
      })
    );

    onClose();
  };

  const titleId = useId();
  const groupControlId = useId();

  return (
    <Modal show={show} onHide={onClose} aria-labelledby={titleId}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id={titleId}>Modifier la fonctionnalité</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId={groupControlId}>
            <FormLabel>Groupe</FormLabel>
            <FormControl name="group" type="text" value={group} onChange={handleValueChange} />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Modifier</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

EditFeatureDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
