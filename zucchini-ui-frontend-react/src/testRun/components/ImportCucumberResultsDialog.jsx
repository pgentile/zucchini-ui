import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import Button from '../../ui/components/Button';


export default class ImportCucumberResultsDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      group: '',
      onlyNewScenarii: true,
      mergeOnlyNewPassedScenarii: false,
      dryRun: false,
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
      file: event.target.files[0],
    });
  };

  onGroupChange = (event) => {
    this.setState({
      group: event.target.value,
    });
  };

  onOptionChange = (name) => {
    return event => {
      this.setState({
        [name]: event.target.checked,
      });
    };
  };

  onImportCucumberResult = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.props.onImportCucumberResult({
      testRunId: this.props.testRunId,
      ...this.state,
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
              <ControlLabel>Fichier à importer</ControlLabel>
              <FormControl type="file" accept=".json" required
                onChange={this.onFileChange} />
              <HelpBlock>Le fichier à importer est un résultat d&apos;exécution Cucumber, au format JSON.</HelpBlock>
            </FormGroup>
            <FormGroup controlId="group">
              <ControlLabel>Groupe</ControlLabel>
              <FormControl type="text"
                  placeholder="Nom d'un groupe pour les fonctionnalités importées"
                  value={this.state.group}
                  onChange={this.onGroupChange} />
            </FormGroup>
            <FormGroup>
              <Checkbox checked={this.state.onlyNewScenarii} onChange={this.onOptionChange('onlyNewScenarii')}>
                Limiter l&apos;import aux nouveaux scénarii
              </Checkbox>
              <Checkbox checked={this.state.mergeOnlyNewPassedScenarii} onChange={this.onOptionChange('mergeOnlyNewPassedScenarii')}>
                Limiter l&apos;import aux scénarii passés avec succès
              </Checkbox>
              <Checkbox checked={this.state.dryRun} onChange={this.onOptionChange('dryRun')}>
                Tir à blanc
              </Checkbox>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onImportCucumberResult}>Importer</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}

ImportCucumberResultsDialog.propTypes = {
  testRunId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImportCucumberResult: PropTypes.func.isRequired,
};
