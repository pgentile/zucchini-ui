import React from 'react';

import ConfirmActionButton from '../../ui/components/ConfirmActionButton';


export default class DeleteFeatureButton extends React.PureComponent {

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
        title="Supprimer la fonctionnalité"
        message="La suppression est irreversible. Êtes-vous sûr de supprimer cette fonctionnalité ?"
        onConfirm={this.onDelete} />
    );
  }

  onDelete() {
    const { featureId, onDelete } = this.props;
    onDelete({ featureId });
  }

}

DeleteFeatureButton.propTypes = {
  featureId: React.PropTypes.string,
  onDelete: React.PropTypes.func.isRequired,
};
