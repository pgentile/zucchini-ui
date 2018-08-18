import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";

import Button from "../../ui/components/Button";

export default class UpdateScenarioReviewedStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenarioId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSetReviewedState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.createDefaultState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scenarioId !== this.props.scenarioId) {
      this.setState(this.createDefaultState());
    }
  }

  createDefaultState() {
    return {
      comment: ""
    };
  }

  onCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onSetReviewedState = event => {
    if (event) {
      event.preventDefault();
    }

    const { scenarioId, onClose, onSetReviewedState } = this.props;
    const { comment } = this.state;

    onSetReviewedState({
      scenarioId,
      comment
    });

    this.setState(this.createDefaultState());

    onClose();
  };

  isStatusSelected(status) {
    return this.state.scenario.status === status;
  }

  onStatusSelected(status) {
    return () => {
      this.setState(prevState => {
        return {
          scenario: {
            ...prevState.scenario,
            status
          }
        };
      });
    };
  }

  onCommentChange = event => {
    const comment = event.target.value;
    this.setState({
      comment
    });
  };

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
              <FormControl
                componentClass="textarea"
                rows="3"
                value={this.state.comment}
                onChange={this.onCommentChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onSetReviewedState}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
