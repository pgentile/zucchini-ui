import { createContext, memo, useContext, useId } from "react";
import PropTypes from "prop-types";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "../../ui/components/Button";
import useForm from "../../useForm";

const TestRunFormContext = createContext();

TestRunFormContext.displayName = "TestRunFormContext";

function TestRunForm({ children, initialValues = {}, onSubmit }) {
  const form = useForm({
    type: "",
    environment: "",
    name: "",
    labels: [],
    ...initialValues
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form.values);
  };

  return (
    <TestRunFormContext.Provider value={form}>
      <Form onSubmit={handleSubmit}>{children}</Form>
    </TestRunFormContext.Provider>
  );
}

TestRunForm.propTypes = {
  children: PropTypes.node,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

export default memo(TestRunForm);

const TestRunFormFields = memo(function TestRunFormFields() {
  const idPrefix = useId();

  const { values, handleValueChange } = useContext(TestRunFormContext);
  const { type, environment, name } = values;

  return (
    <>
      <fieldset>
        <legend>Paramètres principaux</legend>
        <FormGroup controlId={`${idPrefix}-type`}>
          <FormLabel>Type</FormLabel>
          <FormControl name="type" type="text" required value={type} onChange={handleValueChange} />
        </FormGroup>
        <FormGroup controlId={`${idPrefix}-environment`}>
          <FormLabel>Environnement</FormLabel>
          <FormControl name="environment" type="text" required value={environment} onChange={handleValueChange} />
        </FormGroup>
        <FormGroup controlId={`${idPrefix}-name`}>
          <FormLabel>Nom</FormLabel>
          <FormControl name="name" type="text" required value={name} onChange={handleValueChange} />
        </FormGroup>
      </fieldset>
      <AllLabelsForm />
    </>
  );
});

export { TestRunFormFields };

const AllLabelsForm = memo(function AllLabelsForm() {
  const { values, updateValues } = useContext(TestRunFormContext);
  const { labels } = values;

  const handleAddLabel = () => {
    const newLabel = {
      name: "",
      value: "",
      url: ""
    };
    updateValues("labels", (currentLabels) => {
      return [...currentLabels, newLabel];
    });
  };

  const labelRows = labels.map((label, index) => {
    return <LabelForm key={index} index={index} label={label} />;
  });

  return (
    <fieldset>
      <legend>Étiquettes</legend>
      {labels.length > 0 && (
        <Table className="mb-2">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Valeur</th>
              <th>URL</th>
              <th />
            </tr>
          </thead>
          <tbody>{labelRows}</tbody>
        </Table>
      )}
      {labels.length === 0 && <p className="text-muted">Aucun étiquette</p>}
      <ButtonGroup>
        <Button icon={faPlusCircle} variant="outline-secondary" size="sm" onClick={handleAddLabel}>
          Ajouter une étiquette
        </Button>
      </ButtonGroup>
    </fieldset>
  );
});

const LabelForm = memo(function LabelForm({ index, label }) {
  const { handleValueChange, updateValues } = useContext(TestRunFormContext);

  const handleDeleteLabel = () => {
    updateValues("labels", (currentLabels) => {
      return currentLabels.filter((_label, currentIndex) => currentIndex !== index);
    });
  };

  const { name, value, url } = label;

  const prefix = `labels.${index}`;

  return (
    <tr data-testid={`label-${index}`}>
      <td>
        <FormControl
          name={`${prefix}.name`}
          aria-label={`Nom n°${index + 1}`}
          placeholder="Nom"
          type="text"
          required
          value={name}
          onChange={handleValueChange}
        />
      </td>
      <td>
        <FormControl
          name={`${prefix}.value`}
          aria-label={`Valeur n°${index + 1}`}
          placeholder="Valeur"
          type="text"
          value={value}
          onChange={handleValueChange}
        />
      </td>
      <td>
        <FormControl
          name={`${prefix}.url`}
          aria-label={`URL n°${index + 1}`}
          placeholder="URL"
          type="text"
          value={url}
          onChange={handleValueChange}
        />
      </td>
      <td>
        <Button icon={faTimesCircle} iconOnly variant="outline-danger" onClick={handleDeleteLabel}>
          Supprimer l&apos;étiquette n°{index + 1}
        </Button>
      </td>
    </tr>
  );
});

LabelForm.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.object.isRequired
};
