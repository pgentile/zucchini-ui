import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import FormCheck from "react-bootstrap/FormCheck";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import Button from "../../ui/components/Button";

export default class ImportCucumberResultsDialog extends React.PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImportCucumberResult: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      group: "",
      onlyNewScenarii: true,
      mergeOnlyNewPassedScenarii: false,
      dryRun: false
    };
  }

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  };

  onGroupChange = (event) => {
    this.setState({
      group: event.target.value
    });
  };

  onOptionChange = (name) => {
    return (event) => {
      this.setState({
        [name]: event.target.checked
      });
    };
  };

  onImportCucumberResult = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.props.onImportCucumberResult({
      testRunId: this.props.testRunId,
      ...this.state
    });

    this.props.onClose();
  };

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Importer un résultat de tests Cucumber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onImportCucumberResult}>
            <FormGroup controlId="file">
              <FormLabel>Fichier à importer</FormLabel>
              <FormControl type="file" accept=".json" required onChange={this.onFileChange} />
              <Form.Text className="text-muted">
                Le fichier à importer est un résultat d&apos;exécution Cucumber, au format JSON.
              </Form.Text>
            </FormGroup>
            <FormGroup controlId="group">
              <FormLabel>Groupe</FormLabel>
              <FormControl
                type="text"
                placeholder="Nom d'un groupe pour les fonctionnalités importées"
                value={this.state.group}
                onChange={this.onGroupChange}
              />
            </FormGroup>
            <FormGroup>
              <FormCheck
                id="onlyNewScenarii"
                checked={this.state.onlyNewScenarii}
                onChange={this.onOptionChange("onlyNewScenarii")}
                label="Limiter l'import aux nouveaux scénarios"
              />
              <FormCheck
                id="mergeOnlyNewPassedScenarii"
                checked={this.state.mergeOnlyNewPassedScenarii}
                onChange={this.onOptionChange("mergeOnlyNewPassedScenarii")}
                label="Limiter l'import aux scénarios passés avec succès"
              />
              <FormCheck
                id="dryRun"
                checked={this.state.dryRun}
                onChange={this.onOptionChange("dryRun")}
                label="Tir à blanc"
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCloseClick}>
            Annuler
          </Button>
          <Button onClick={this.onImportCucumberResult}>Importer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
