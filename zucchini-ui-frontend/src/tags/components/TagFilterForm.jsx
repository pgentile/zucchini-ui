import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { reduxForm, Field } from "redux-form";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "../../ui/components/Button";

class TagFilterForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired
  };

  onClearFilter = () => {
    this.props.reset();
  };

  renderField = ({ input, meta, ...otherProps }) => {
    // eslint-disable-line no-unused-vars
    return <FormControl {...input} {...otherProps} />;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="filter">
          <InputGroup size="lg">
            <Field
              name="filter"
              component={this.renderField}
              placeholder="Entrez les premières lettres d'un tag&hellip;"
            />
            <InputGroup.Append>
              <Button icon={faTimesCircle} iconOnly onClick={this.onClearFilter}>
                Effacer
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default reduxForm({
  form: "tagFilter",
  onSubmit: () => {}
})(TagFilterForm);
