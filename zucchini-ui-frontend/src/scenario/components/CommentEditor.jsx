import PropTypes from "prop-types";
import { memo, useId } from "react";
import { useDispatch } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FormLabel from "react-bootstrap/FormLabel";

import Button from "../../ui/components/Button";
import { updateCommentThenReload } from "../redux";
import Form from "react-bootstrap/Form";
import useForm from "../../useForm";

function CommentEditor({ comment, onCancel, onSaved }) {
  const { values, handleValueChange } = useForm({
    content: comment.content
  });

  const { content } = values;

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      updateCommentThenReload({
        scenarioId: comment.scenarioId,
        commentId: comment.id,
        newContent: content
      })
    );

    onSaved();
  };

  const contentId = useId();

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-2" controlId={contentId}>
        <FormLabel srOnly>Commentaire</FormLabel>
        <FormControl as="textarea" rows="3" autoFocus name="content" value={content} onChange={handleValueChange} />
      </FormGroup>
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Annuler
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="primary" size="sm" type="submit" disabled={!content}>
            Enregistrer
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Form>
  );
}

CommentEditor.propTypes = {
  comment: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};

export default memo(CommentEditor);
