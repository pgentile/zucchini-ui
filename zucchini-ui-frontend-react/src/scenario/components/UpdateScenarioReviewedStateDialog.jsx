import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';


export default class UpdateScenarioReviewedStateDialog extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSetReviewedState = this.onSetReviewedState.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);

    this.state = this.createDefaultStateFromProps(props);
  }

  componentDidUpdate(prevProps) {
    const { scenarioId } = this.props;
    if (scenarioId !== prevProps.scenarioId) {
      this.setState(this.createDefaultStateFromProps(this.props));
    }
  }

  createDefaultStateFromProps() {
    return {
      comment: '',
    };
  }

  render() {
    const { show } = this.props;

    return (
      <Modal bsSize="large" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Marquer le scénario comme analysé&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSetReviewedState}>
            <FormGroup controlId="comment">
              <ControlLabel>Commentaire</ControlLabel>
              <FormControl componentClass="textarea" rows="3" value={this.state.comment} onChange={this.onCommentChange} />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onSetReviewedState}>Valider</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  onCloseClick(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  onSetReviewedState(event) {
    if (event) {
      event.preventDefault();
    }

    const { scenarioId, onClose, onSetReviewedState } = this.props;
    const { comment } = this.state;

    onSetReviewedState({
      scenarioId,
      comment,
    });

    this.setState((prevState, props) => {
      return this.createDefaultStateFromProps(props);
    });

    onClose();
  }

  isStatusSelected(status) {
    return this.state.scenario.status === status;
  }

  onStatusSelected(status) {
    return () => {
      this.setState(prevState => {
        return {
          scenario: {
            ...prevState.scenario,
            status,
          },
        };
      });
    };
  }

  onCommentChange(event) {
    const comment = event.target.value;
    this.setState({
      comment,
    });
  }

}

UpdateScenarioReviewedStateDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  scenarioId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSetReviewedState: PropTypes.func.isRequired,
};
