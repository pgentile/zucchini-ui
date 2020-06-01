import React, { useState, useCallback, memo, createContext } from "react";
import PropTypes from "prop-types";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import noop from "lodash/noop";

import { useMultiUniqueId } from "../../useUniqueId";
import Button from "../../ui/components/Button";
import { useContext } from "react";

const Context = createContext({
  values: {},
  setValues: noop
});

Context.displayName = "TestRunFormContext";

function TestRunForm({ children, initialValues = {}, onSubmit }) {
  const [values, setValues] = useState(() => {
    return {
      type: "",
      environment: "",
      name: "",
      labels: [],
      ...initialValues
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <Context.Provider value={[values, setValues]}>
      <Form onSubmit={handleSubmit}>{children}</Form>
    </Context.Provider>
  );
}

TestRunForm.propTypes = {
  children: PropTypes.node,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

export default memo(TestRunForm);

const TestRunFormFields = memo(function TestRunFormFields() {
  const fieldIds = useMultiUniqueId(["type", "environment", "name"]);

  const [values, setValues] = useContext(Context);
  const { type, environment, name, labels } = values;

  const handleFieldChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((currentValues) => {
        return {
          ...currentValues,
          [name]: value
        };
      });
    },
    [setValues]
  );

  const handleUpdateLabels = useCallback(
    (labels) => {
      setValues((currentValues) => {
        return {
          ...currentValues,
          labels
        };
      });
    },
    [setValues]
  );

  return (
    <>
      <fieldset>
        <legend>Paramètres principaux</legend>
        <FormGroup controlId={fieldIds.type}>
          <FormLabel>Type</FormLabel>
          <FormControl name="type" type="text" required value={type} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId={fieldIds.environment}>
          <FormLabel>Environnement</FormLabel>
          <FormControl name="environment" type="text" required value={environment} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId={fieldIds.name}>
          <FormLabel>Nom</FormLabel>
          <FormControl name="name" type="text" required value={name} onChange={handleFieldChange} />
        </FormGroup>
      </fieldset>
      <AllLabelsForm labels={labels} onUpdateLabels={handleUpdateLabels} />
    </>
  );
});

export { TestRunFormFields };

const AllLabelsForm = memo(function AllLabelsForm({ labels, onUpdateLabels }) {
  const handleAddLabel = () => {
    const newLabel = { name: "", value: "", url: "" };
    onUpdateLabels([...labels, newLabel]);
  };

  const labelRows = labels.map((label, index) => {
    const handleChangeLabel = (name, value) => {
      const updatedLabels = labels.map((label, someIndex) => {
        if (someIndex !== index) {
          return label;
        }

        return {
          ...label,
          [name]: value
        };
      });

      onUpdateLabels(updatedLabels);
    };

    const handleDeleteLabel = () => {
      const updatedLabels = labels.filter((_label, someIndex) => someIndex !== index);
      onUpdateLabels(updatedLabels);
    };

    return (
      <LabelForm
        key={index}
        index={index}
        label={label}
        onChangeLabel={handleChangeLabel}
        onDeleteLabel={handleDeleteLabel}
      />
    );
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

AllLabelsForm.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateLabels: PropTypes.func.isRequired
};

const LabelForm = memo(function LabelForm({ index, label, onChangeLabel, onDeleteLabel }) {
  const { name, value, url } = label;

  const prefix = `labels.${index}`;

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const localName = name.substr(prefix.length + 1);
    onChangeLabel(localName, value);
  };

  return (
    <tr data-testid={`label-${index}`}>
      <td>
        <FormControl
          name={`${prefix}.name`}
          aria-label="Nom"
          placeholder="Nom"
          type="text"
          required
          value={name}
          onChange={handleFieldChange}
        />
      </td>
      <td>
        <FormControl
          name={`${prefix}.value`}
          aria-label="Valeur"
          placeholder="Valeur"
          type="text"
          value={value}
          onChange={handleFieldChange}
        />
      </td>
      <td>
        <FormControl
          name={`${prefix}.url`}
          aria-label="URL"
          placeholder="URL"
          type="text"
          value={url}
          onChange={handleFieldChange}
        />
      </td>
      <td>
        <Button icon={faTimesCircle} iconOnly variant="outline-danger" onClick={onDeleteLabel}>
          Supprimer
        </Button>
      </td>
    </tr>
  );
});

LabelForm.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.object.isRequired,
  onChangeLabel: PropTypes.func.isRequired,
  onDeleteLabel: PropTypes.func.isRequired
};
