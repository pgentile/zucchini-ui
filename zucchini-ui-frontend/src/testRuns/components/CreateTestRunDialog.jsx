import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";

import Button from "../../ui/components/Button";

export default class CreateTestRunDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreateTestRun: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      newTestRun: {
        type: "",
        environment: "",
        name: ""
      }
    };
  }

  onTypeChange = event => {
    event.preventDefault();

    const type = event.target.value;

    this.setState(previousState => ({
      newTestRun: {
        ...previousState.newTestRun,
        type
      }
    }));
  };

  onNameChange = event => {
    event.preventDefault();

    const name = event.target.value;

    this.setState(previousState => ({
      newTestRun: {
        ...previousState.newTestRun,
        name
      }
    }));
  };

  onEnvironmentChange = event => {
    event.preventDefault();

    const environment = event.target.value;

    this.setState(previousState => ({
      newTestRun: {
        ...previousState.newTestRun,
        environment
      }
    }));
  };

  onCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onCreateTestRun = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onCreateTestRun(this.state.newTestRun);
    this.props.onClose();
  };

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un tir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onCreateTestRun}>
            <FormGroup controlId="type">
              <ControlLabel>Type</ControlLabel>
              <FormControl type="text" autoFocus value={this.state.newTestRun.type} onChange={this.onTypeChange} />
            </FormGroup>
            <FormGroup controlId="environment">
              <ControlLabel>Environnement</ControlLabel>
              <FormControl type="text" value={this.state.newTestRun.environment} onChange={this.onEnvironmentChange} />
            </FormGroup>
            <FormGroup controlId="name">
              <ControlLabel>Nom</ControlLabel>
              <FormControl type="text" value={this.state.newTestRun.name} onChange={this.onNameChange} />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onCreateTestRun}>
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
