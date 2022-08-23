import { useEffect, useId } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

import Button from "../../ui/components/Button";
import { addScenarioCommentAndReload } from "../redux";
import useForm from "../../useForm";

export default function AddCommentForm({ onCommentAdded }) {
  const dispatch = useDispatch();

  const { values, handleValueChange, reset } = useForm({
    comment: ""
  });

  const { comment } = values;

  const { scenarioId } = useParams();

  useEffect(() => {
    reset();
  }, [reset, scenarioId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      addScenarioCommentAndReload({
        scenarioId,
        comment
      })
    );
    const newCommentId = result.value.id;

    reset();

    if (onCommentAdded) {
      onCommentAdded({ newCommentId });
    }
  };

  const commentControlId = useId();

  return (
    <Form onSubmit={handleSubmit} data-testid="add-comment">
      <FormGroup className="mb-2" controlId={commentControlId}>
        <FormLabel srOnly>Commentaire</FormLabel>
        <FormControl
          as="textarea"
          rows="3"
          placeholder="Entrez votre commentaire"
          name="comment"
          value={comment}
          onChange={handleValueChange}
        />
      </FormGroup>
      <Button type="submit" disabled={!comment}>
        Ajouter le commentaire
      </Button>
    </Form>
  );
}

AddCommentForm.propTypes = {
  onCommentAdded: PropTypes.func
};
