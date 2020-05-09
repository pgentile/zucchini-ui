import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";

import Button from "../../ui/components/Button";

const AVAILABLE_STATUS = {
  PASSED: "Succès",
  FAILED: "Échec",
  NOT_RUN: "Non joué",
  PENDING: "En attente"
};

export default class UpdateScenarioStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenario: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdateState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.createDefaultStateFromProps(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scenario !== this.props.scenario) {
      this.setState(this.createDefaultStateFromProps(this.props));
    }
  }

  createDefaultStateFromProps({ scenario }) {
    const status = scenario ? scenario.status : null;
    return {
      scenario: {
        status,
        reviewed: true
      },
      comment: ""
    };
  }

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onUpdateState = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onUpdateState({
      scenarioId: this.props.scenario.id,
      newState: this.state.scenario,
      comment: this.state.comment
    });
    this.props.onClose();
  };

  isStatusSelected = (status) => {
    return this.state.scenario.status === status;
  };

  onStatusSelected = (status) => {
    return () => {
      this.setState((prevState) => {
        return {
          scenario: {
            ...prevState.scenario,
            status
          }
        };
      });
    };
  };

  onReviewedChange = () => {
    this.setState((prevState) => {
      return {
        scenario: {
          ...prevState.scenario,
          reviewed: !prevState.scenario.reviewed
        }
      };
    });
  };

  onCommentChange = (event) => {
    const comment = event.target.value;
    this.setState({
      comment
    });
  };

  render() {
    const { show } = this.props;

    const statusRadios = Object.keys(AVAILABLE_STATUS).map((status) => {
      const label = AVAILABLE_STATUS[status];
      return (
        <FormCheck
          type="radio"
          label={label}
          key={status}
          checked={this.isStatusSelected(status)}
          onChange={this.onStatusSelected(status)}
        />
      );
    });

    return (
      <Modal size="lg" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le statut du scénario&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onUpdateState}>
            <FormGroup>
              <FormLabel>Nouveau statut</FormLabel>
              {statusRadios}
            </FormGroup>
            <FormGroup>
              <FormLabel>Analyse du scénario</FormLabel>
              <FormCheck
                checked={this.state.scenario.reviewed}
                onChange={this.onReviewedChange}
                label="Scénario analysé ?"
              />
            </FormGroup>
            <FormGroup controlId="comment">
              <FormLabel>Commentaire</FormLabel>
              <FormControl as="textarea" rows="3" value={this.state.comment} onChange={this.onCommentChange} />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button variant="primary" onClick={this.onUpdateState}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
