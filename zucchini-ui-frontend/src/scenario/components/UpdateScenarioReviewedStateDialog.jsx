import PropTypes from "prop-types";
import { memo, useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import Button from "../../ui/components/Button";
import { setScenarioReviewedStateAndComment } from "../redux";
import useForm from "../../useForm";

function UpdateScenarioReviewedStateDialog({ show, onClose }) {
  const scenarioId = useSelector((state) => state.scenario.scenario.id);

  const { values, reset, handleValueChange } = useForm({
    comment: ""
  });

  const { comment } = values;

  useEffect(() => {
    reset();
  }, [reset, scenarioId]);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      setScenarioReviewedStateAndComment({
        scenarioId,
        comment
      })
    );

    onClose();
  };

  const commentId = useId();

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Marquer le scénario comme analysé&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

UpdateScenarioReviewedStateDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(UpdateScenarioReviewedStateDialog);
