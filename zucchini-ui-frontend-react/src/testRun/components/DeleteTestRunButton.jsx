import React from 'react';

import ConfirmActionButton from '../../ui/components/ConfirmActionButton';


export default class DeleteTestRunButton extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    return (
      <ConfirmActionButton
        bsStyle="danger"
        actionGlyph="remove"
        actionLabel="Supprimer"
        title="Supprimer le tir"
        message="La suppression est irreversible. Êtes-vous sûr de supprimer ce tir ?"
        onConfirm={this.onDelete} />
    );
  }

  onDelete() {
    const { testRunId, onDelete } = this.props;
    onDelete({ testRunId });
  }

}

DeleteTestRunButton.propTypes = {
  testRunId: React.PropTypes.string,
  onDelete: React.PropTypes.func.isRequired,
};
