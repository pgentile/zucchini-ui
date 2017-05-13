import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import SimpleText from '../../ui/components/SimpleText';
import ConfirmActionButton from '../../ui/components/ConfirmActionButton';


export default class CommentText extends React.PureComponent {

  onEdit = () => {
    this.props.onEdit();
  }

  onDelete = () => {
    this.props.onDelete();
  }

  render() {
    const { comment } = this.props;

    return (
      <div>
        <SimpleText text={comment.content} />
        <p>
          <Button bsSize="xsmall" onClick={this.onEdit}>
            <Glyphicon glyph="pencil" />
            {' '}
            Modifier
          </Button>
          {' '}
          <ConfirmActionButton
            bsStyle="danger"
            bsSize="xsmall"
            actionGlyph="remove"
            actionLabel="Supprimer"
            title="Supprimer le commentaire"
            message="La suppression est irreversible. Êtes-vous sûr de supprimer ce commentaire ?"
            onConfirm={this.onDelete} />
        </p>
      </div>
    );
  }

}

CommentText.propTypes = {
  comment: PropTypes.object.isRequired,
  testRunId: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
