import PropTypes from "prop-types";
import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FormLabel from "react-bootstrap/FormLabel";

import Button from "../../ui/components/Button";
import { updateCommentThenReload } from "../redux";
import useUniqueId from "../../useUniqueId";

function CommentEditor({ comment, onCancel, onSaved }) {
  const [content, setContent] = useState(comment.content);

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const dispatch = useDispatch();

  const handleSaveClick = async () => {
    await dispatch(
      updateCommentThenReload({
        scenarioId: comment.scenarioId,
        commentId: comment.id,
        newContent: content
      })
    );
    onSaved();
  };

  const textId = useUniqueId();

  return (
    <>
      <FormGroup className="mb-2" controlId={textId}>
        <FormLabel srOnly>Commentaire</FormLabel>
        <FormControl as="textarea" rows="3" autoFocus value={content} onChange={handleTextChange} />
      </FormGroup>
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Annuler
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="primary" size="sm" onClick={handleSaveClick} disabled={!content}>
            Enregistrer
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

CommentEditor.propTypes = {
  comment: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};

export default memo(CommentEditor);
