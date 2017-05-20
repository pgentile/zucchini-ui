import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import Button from '../../ui/components/Button';


export default class ConfirmActionButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  onShowConfirmation = () => {
    this.setState({
      show: true,
    });
  };

  onConfirm = () => {
    this.setState({
      show: false,
    });

    this.props.onConfirm();
  };

  onCancel = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { actionGlyph, actionLabel, title, message, bsStyle, bsSize } = this.props;
    const { show } = this.state;

    return (
      <span>
        <Button glyph={actionGlyph} bsStyle={bsStyle} bsSize={bsSize} onClick={this.onShowConfirmation}>
          {actionLabel}
        </Button>

        <Modal show={show} onHide={this.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onCancel}>Annuler</Button>
            <Button bsStyle="primary" onClick={this.onConfirm}>{actionLabel}</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }

}

ConfirmActionButton.propTypes = {
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string,
  actionGlyph: PropTypes.string,
  actionLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
