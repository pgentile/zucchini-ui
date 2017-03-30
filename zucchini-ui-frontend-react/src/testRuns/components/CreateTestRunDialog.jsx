import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';


export default class CreateTestRunDialog extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onCreateTestRun = this.onCreateTestRun.bind(this);

    this.state = {
      newTestRun: {
        type: '',
      },
    };
  }

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
              <FormControl type="text" value={this.state.newTestRun.type} onChange={this.onTypeChange} />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onCreateTestRun}>Créer</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  onTypeChange(event) {
    event.preventDefault();

    const type = event.target.value;

    this.setState(previousState => ({
      newTestRun: {
        ...previousState.newTestRun,
        type,
      },
    }));
  }

  onCloseClick(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  onCreateTestRun(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onCreateTestRun(this.state.newTestRun);
    this.props.onClose();
  }

}

CreateTestRunDialog.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onCreateTestRun: React.PropTypes.func.isRequired,
};
