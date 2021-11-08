import PropTypes from "prop-types";
import { PureComponent, Fragment } from "react";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";

export default class ConfirmActionButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  onShowConfirmation = () => {
    this.setState({
      show: true
    });
  };

  onConfirm = () => {
    this.setState({
      show: false
    });

    this.props.onConfirm();
  };

  onCancel = () => {
    this.setState({
      show: false
    });
  };

  render() {
    const { actionIcon, actionLabel, title, message, variant, size } = this.props;
    const { show } = this.state;

    return (
      <Fragment>
        <Button icon={actionIcon} variant={variant} size={size} onClick={this.onShowConfirmation}>
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
            <Button variant="secondary" onClick={this.onCancel}>
              Annuler
            </Button>
            <Button onClick={this.onConfirm}>{actionLabel}</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

ConfirmActionButton.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  actionIcon: PropTypes.object.isRequired,
  actionLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired
};
