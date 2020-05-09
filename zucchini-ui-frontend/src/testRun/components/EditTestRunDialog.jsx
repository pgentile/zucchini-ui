import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/Modal";

import Button from "../../ui/components/Button";
import EditTestRunForm from "./EditTestRunForm";

export default class EditTestRunDialog extends React.PureComponent {
  static propTypes = {
    testRun: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEditTestRun: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.formRef = null;
  }

  onCloseClick = () => {
    this.props.onClose();
  };

  onEditTestRun = (values) => {
    this.props.onEditTestRun({
      testRunId: this.props.testRun.id,
      ...values
    });

    this.props.onClose();
  };

  setFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onEditTestRunClick = () => {
    this.formRef.submit();
  };

  render() {
    const { show, testRun } = this.props;

    return (
      <Modal size="lg" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations du tir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTestRunForm
            ref={this.setFormRef}
            initialValues={testRun}
            enableReinitialize
            onSubmit={this.onEditTestRun}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button variant="primary" onClick={this.onEditTestRunClick}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
