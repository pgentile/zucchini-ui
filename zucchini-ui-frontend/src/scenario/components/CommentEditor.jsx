import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";

import Button from "../../ui/components/Button";

export default class CommentEditor extends React.PureComponent {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    testRunId: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment.content
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onSave = () => {
    this.props.onSave({
      newContent: this.state.comment
    });
  };

  onCommentChange = (event) => {
    this.setState({
      comment: event.target.value
    });
  };

  render() {
    const { comment } = this.state;

    return (
      <div>
        <FormGroup>
          <FormControl componentClass="textarea" rows="3" autoFocus value={comment} onChange={this.onCommentChange} />
        </FormGroup>
        <p>
          <Button bsSize="xsmall" onClick={this.onCancel}>
            Annuler
          </Button>{" "}
          <Button bsStyle="primary" bsSize="xsmall" onClick={this.onSave} disabled={!comment}>
            Enregistrer
          </Button>
        </p>
      </div>
    );
  }
}
