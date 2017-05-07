import PropTypes from 'prop-types';
import React from 'react';

import ConfirmActionButton from '../../ui/components/ConfirmActionButton';


export default class DeleteFeatureButton extends React.PureComponent {

  onDelete = () => {
    const { featureId, onDelete } = this.props;
    onDelete({ featureId });
  };

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

}

DeleteFeatureButton.propTypes = {
  featureId: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};
