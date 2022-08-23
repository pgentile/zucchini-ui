import { useId, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormCheck from "react-bootstrap/FormCheck";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import Button from "../../ui/components/Button";
import { importCucumberResultThenReload } from "../redux";

export default function ImportCucumberResultsDialog({ show, onClose }) {
  const testRunId = useSelector((state) => state.testRun.testRun.id);

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    file: null,
    group: "",
    onlyNewScenarii: true,
    mergeOnlyNewPassedScenarii: false,
    dryRun: false
  });
  const { group, onlyNewScenarii, mergeOnlyNewPassedScenarii, dryRun } = values;

  const handleValueChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value
      };
    });
  };

  const handleCheckChange = (event) => {
    const { name, checked } = event.target;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: checked
      };
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: files[0]
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      importCucumberResultThenReload({
        testRunId: testRunId,
        ...values
      })
    );

    onClose();
  };

  const titleId = useId();
  const fileControlId = useId();
  const groupControlId = useId();
  const onlyNewScenariiControlId = useId();
  const mergeOnlyNewPassedScenariiControlId = useId();
  const dryRunControlId = useId();

  return (
    <Modal show={show} onHide={onClose} aria-labelledby={titleId}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id={titleId}>Importer un résultat de tests Cucumber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId={fileControlId}>
            <FormLabel>Fichier à importer</FormLabel>
            <FormControl name="file" type="file" accept=".json" required onChange={handleFileChange} />
            <Form.Text className="text-muted">
              Le fichier à importer est un résultat d&apos;exécution Cucumber, au format JSON.
            </Form.Text>
          </FormGroup>
          <FormGroup controlId={groupControlId}>
            <FormLabel>Groupe</FormLabel>
            <FormControl
              name="group"
              type="text"
              placeholder="Nom d'un groupe pour les fonctionnalités importées"
              value={group}
              onChange={handleValueChange}
            />
          </FormGroup>
          <FormGroup>
            <FormCheck
              id={onlyNewScenariiControlId}
              name="onlyNewScenarii"
              checked={onlyNewScenarii}
              onChange={handleCheckChange}
              label="Limiter l'import aux nouveaux scénarios"
            />
            <FormCheck
              id={mergeOnlyNewPassedScenariiControlId}
              name="mergeOnlyNewPassedScenarii"
              checked={mergeOnlyNewPassedScenarii}
              onChange={handleCheckChange}
              label="Limiter l'import aux scénarios passés avec succès"
            />
            <FormCheck
              id={dryRunControlId}
              name="dryRun"
              checked={dryRun}
              onChange={handleCheckChange}
              label="Tir à blanc"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Importer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

ImportCucumberResultsDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
