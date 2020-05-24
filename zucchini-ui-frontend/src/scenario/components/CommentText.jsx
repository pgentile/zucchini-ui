import PropTypes from "prop-types";
import React from "react";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "../../ui/components/Button";
import SimpleText from "../../ui/components/SimpleText";
import ConfirmActionButton from "../../ui/components/ConfirmActionButton";

export default class CommentText extends React.PureComponent {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    testRunId: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  onEdit = () => {
    this.props.onEdit();
  };

  onDelete = () => {
    this.props.onDelete();
  };

  render() {
    const { comment } = this.props;

    return (
      <>
        <SimpleText text={comment.content} className="mb-2" />
        <p>
          <Button icon={faEdit} variant="outline-primary" size="sm" onClick={this.onEdit}>
            Modifier
          </Button>{" "}
          <ConfirmActionButton
            variant="outline-danger"
            size="sm"
            actionIcon={faTimesCircle}
            actionLabel="Supprimer"
            title="Supprimer le commentaire"
            message="La suppression est irreversible. Êtes-vous sûr de supprimer ce commentaire ?"
            onConfirm={this.onDelete}
          />
        </p>
      </>
    );
  }
}
