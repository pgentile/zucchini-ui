import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import { reduxForm, Field } from "redux-form";

import Button from "../../ui/components/Button";

class TagSelectionForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired
  };

  renderField = ({ input, meta, ...otherProps }) => {
    // eslint-disable-line no-unused-vars
    return <FormControl {...input} {...otherProps} />;
  };

  formatTags = (tags) => {
    if (tags) {
      return tags.join(" ");
    }
    return "";
  };

  parseTags = (tagsStr) => {
    if (tagsStr && tagsStr.length) {
      return tagsStr.split(" ");
    }
    return [];
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>
            <FormGroup controlId="tags">
              <InputGroup>
                <FormLabel className="input-group-addon">Tags inclus</FormLabel>
                <Field name="tags" component={this.renderField} format={this.formatTags} parse={this.parseTags} />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup controlId="excludedTags">
              <InputGroup>
                <FormLabel className="input-group-addon">Tags exclus</FormLabel>
                <Field
                  name="excludedTags"
                  component={this.renderField}
                  format={this.formatTags}
                  parse={this.parseTags}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button glyph="refresh" type="submit" block>
              Actualiser
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: "tagSelection"
})(TagSelectionForm);
