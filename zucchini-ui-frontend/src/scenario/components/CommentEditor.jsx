import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import Button from '../../ui/components/Button';


export default class CommentEditor extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment.content,
    };
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSave = () => {
    this.props.onSave({
      newContent: this.state.comment,
    });
  }

  onCommentChange = event => {
    this.setState({
      comment: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <FormGroup>
          <FormControl
            componentClass="textarea"
            rows="3"
            value={this.state.comment}
            onChange={this.onCommentChange} />
        </FormGroup>
        <p>
          <Button bsSize="xsmall" onClick={this.onCancel}>
            Annuler
          </Button>
          {' '}
          <Button bsStyle="primary" bsSize="xsmall" onClick={this.onSave}>
            Enregistrer
          </Button>
        </p>
      </div>
    );
  }

}

CommentEditor.propTypes = {
  comment: PropTypes.object.isRequired,
  testRunId: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
