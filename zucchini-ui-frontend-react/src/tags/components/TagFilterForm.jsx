import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import { reduxForm, Field } from 'redux-form'

import Button from '../../ui/components/Button';


class TagFilterForm extends React.PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  onClearFilter = () => {
    this.props.reset();
  };

  renderField = ({input, meta, ...otherProps}) => {
    console.debug('Meta on', input.name, ':', meta);
    return (
      <FormControl {...input} {...otherProps} />
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="filter">
          <InputGroup>
            <Field name="filter" component={this.renderField} />
            <InputGroup.Button>
              <Button glyph="remove-circle" onClick={this.onClearFilter} />
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }

}


export default reduxForm({
  form: 'tagFilter',
  onSubmit: () => {},
})(TagFilterForm);
