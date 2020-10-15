import PropTypes from "prop-types";
import { memo } from "react";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import Button from "../../ui/components/Button";
import SimpleText from "../../ui/components/SimpleText";
import ConfirmActionButton from "../../ui/components/ConfirmActionButton";
import { useDispatch } from "react-redux";
import { deleteComment } from "../redux";

function CommentText({ comment, onEdit }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(
      deleteComment({
        scenarioId: comment.scenarioId,
        commentId: comment.id
      })
    );
  };

  return (
    <>
      <SimpleText text={comment.content} className="mb-2" />
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button icon={faEdit} variant="outline-primary" size="sm" onClick={onEdit}>
            Modifier
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <ConfirmActionButton
            variant="outline-danger"
            size="sm"
            actionIcon={faTimesCircle}
            actionLabel="Supprimer"
            title="Supprimer le commentaire"
            message="La suppression est irreversible. Êtes-vous sûr de supprimer ce commentaire ?"
            onConfirm={onDelete}
          />
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

CommentText.propTypes = {
  comment: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default memo(CommentText);
