import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, FieldArray } from "redux-form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";

import Button from "../../ui/components/Button";

class EditTestRunForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired
  };

  renderField = ({ input, meta, ...otherProps }) => {
    // eslint-disable-line no-unused-vars
    return <FormControl {...input} {...otherProps} />;
  };

  renderLabelFields = ({ fields }) => {
    const addLabel = () => fields.push({});

    /* eslint-disable react/jsx-no-bind */
    return (
      <Table>
        <thead>
          <tr>
            <th className="col-md-4">Nom</th>
            <th className="col-md-4">Valeur</th>
            <th className="col-md-4">URL</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{fields.map(this.renderLabelField)}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <Button glyph="plus-sign" bsSize="small" onClick={addLabel}>
                Ajouter une étiquette
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    );
    /* eslint-enable */
  };

  renderLabelField = (member, index, fields) => {
    const removeField = () => fields.remove(index);

    /* eslint-disable react/jsx-no-bind */
    return (
      <tr key={index}>
        <td>
          <Field name={`${member}.name`} required placeholder="Nom" component={this.renderField} />
        </td>
        <td>
          <Field name={`${member}.value`} required placeholder="Valeur" component={this.renderField} />
        </td>
        <td>
          <Field name={`${member}.url`} type="url" placeholder="URL" component={this.renderField} />
        </td>
        <td>
          <Button glyph="remove" variant="danger" onClick={removeField} />
        </td>
      </tr>
    );
    /* eslint-enable */
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="type">
          <FormLabel>Type</FormLabel>
          <Field name="type" required component={this.renderField} />
        </FormGroup>
        <FormGroup controlId="environment">
          <FormLabel>Environnement</FormLabel>
          <Field name="environment" required component={this.renderField} />
        </FormGroup>
        <FormGroup controlId="name">
          <FormLabel>Nom</FormLabel>
          <Field name="name" autoFocus required component={this.renderField} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Étiquettes</FormLabel>
          <FieldArray name="labels" component={this.renderLabelFields} />
        </FormGroup>
      </form>
    );
  }
}

export default reduxForm({
  form: "editTestRun"
})(EditTestRunForm);
