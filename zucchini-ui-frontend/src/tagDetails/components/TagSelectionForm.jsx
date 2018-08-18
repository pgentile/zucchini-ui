import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormGroup from "react-bootstrap/lib/FormGroup";
import InputGroup from "react-bootstrap/lib/InputGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
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

  formatTags = tags => {
    if (tags) {
      return tags.join(" ");
    }
    return "";
  };

  parseTags = tagsStr => {
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
                <ControlLabel className="input-group-addon">Tags inclus</ControlLabel>
                <Field name="tags" component={this.renderField} format={this.formatTags} parse={this.parseTags} />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup controlId="excludedTags">
              <InputGroup>
                <ControlLabel className="input-group-addon">Tags exclus</ControlLabel>
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
