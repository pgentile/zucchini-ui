import PropTypes from "prop-types";
import React from "react";

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
      <div>
        <SimpleText text={comment.content} />
        <p>
          <Button glyph="pencil" size="sm" onClick={this.onEdit}>
            Modifier
          </Button>{" "}
          <ConfirmActionButton
            variant="danger"
            size="sm"
            actionGlyph="remove"
            actionLabel="Supprimer"
            title="Supprimer le commentaire"
            message="La suppression est irreversible. Êtes-vous sûr de supprimer ce commentaire ?"
            onConfirm={this.onDelete}
          />
        </p>
      </div>
    );
  }
}
