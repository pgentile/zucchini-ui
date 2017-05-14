import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form'
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';

import Button from '../../ui/components/Button';


class EditTestRunForm extends React.PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
  };

  renderField = ({ input, placeholder }) => {
    return (
      <FormControl {...input} placeholder={placeholder} />
    );
  };

  renderLabelFields = ({ fields }) => {
    const addLabel = () => fields.push({});

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
        <tbody>
          {fields.map(this.renderLabelField)}
        </tbody>
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
  };

  renderLabelField = (member, index, fields) => {
    const removeField = () => fields.remove(index);

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
          <Button glyph="remove" bsStyle="danger" onClick={removeField} />
        </td>
      </tr>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="type">
          <ControlLabel>Type</ControlLabel>
          <Field name="type" required component={this.renderField} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Étiquettes</ControlLabel>
          <FieldArray name="labels" component={this.renderLabelFields} />
        </FormGroup>
      </form>
    );
  }

}


export default reduxForm({
  form: 'editTestRun',
})(EditTestRunForm);
