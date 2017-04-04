import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default class ConfirmActionButton extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onShowConfirmation = this.onShowConfirmation.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      show: false,
    };
  }

  render() {
    const { actionGlyph, actionLabel, title, message, bsStyle } = this.props;
    const { show } = this.state;

    let buttonContent = actionLabel;
    if (actionGlyph) {
      buttonContent = (
        <span>
          <Glyphicon glyph={actionGlyph} /> {actionLabel}
        </span>
      );
    }

    return (
      <span>
        <Button bsStyle={bsStyle} onClick={this.onShowConfirmation}>
          {buttonContent}
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

  onShowConfirmation() {
    this.setState({
      show: true,
    });
  }

  onConfirm() {
    this.setState({
      show: false,
    });

    this.props.onConfirm();
  }

  onCancel() {
    this.setState({
      show: false,
    });
  }
}

ConfirmActionButton.propTypes = {
  bsStyle: React.PropTypes.string,
  actionGlyph: React.PropTypes.string,
  actionLabel: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  onConfirm: React.PropTypes.func.isRequired,
};
