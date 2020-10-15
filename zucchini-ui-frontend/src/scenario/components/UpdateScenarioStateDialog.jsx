import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import Button from "../../ui/components/Button";
import useUniqueId, { useMultiUniqueId } from "../../useUniqueId";
import { updateScenarioStateAndComment } from "../redux";
import useForm from "../../useForm";

const AVAILABLE_STATUS = {
  PASSED: "Succès",
  FAILED: "Échec",
  NOT_RUN: "Non joué",
  PENDING: "En attente"
};

function UpdateScenarioStateDialog({ show, onClose }) {
  const scenario = useSelector((state) => state.scenario.scenario);

  const { values, reset, handleValueChange, handleCheckboxChange, handleRadioChange } = useForm({
    status: scenario.status,
    reviewed: true,
    comment: ""
  });

  const { status, reviewed, comment } = values;

  useEffect(() => {
    reset();
  }, [reset, scenario]);

  const statusRadioIds = useMultiUniqueId(Object.keys(AVAILABLE_STATUS));

  const statusRadios = Object.entries(AVAILABLE_STATUS).map((entry) => {
    const [someStatus, label] = entry;
    return (
      <FormCheck
        name="status"
        value={someStatus}
        type="radio"
        id={statusRadioIds[someStatus]}
        label={label}
        key={someStatus}
        checked={someStatus === status}
        onChange={handleRadioChange}
      />
    );
  });

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      updateScenarioStateAndComment({
        scenarioId: scenario.id,
        newState: {
          status,
          reviewed
        },
        comment
      })
    );

    onClose();
  };

  const reviewedId = useUniqueId();
  const commentId = useUniqueId();

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le statut du scénario&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormLabel>Nouveau statut</FormLabel>
            {statusRadios}
          </FormGroup>
          <FormGroup>
            <FormLabel>Analyse du scénario</FormLabel>
            <FormCheck
              id={reviewedId}
              name="reviewed"
              checked={reviewed}
              onChange={handleCheckboxChange}
              label="Scénario analysé ?"
            />
          </FormGroup>
          <FormGroup controlId={commentId}>
            <FormLabel>Commentaire</FormLabel>
            <FormControl as="textarea" rows="3" name="comment" value={comment} onChange={handleValueChange} />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Valider</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

UpdateScenarioStateDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(UpdateScenarioStateDialog);
