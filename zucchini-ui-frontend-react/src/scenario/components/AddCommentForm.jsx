import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';


export default class AddCommentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.createDefaultState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scenarioId !== nextProps.scenarioId) {
      this.setState(this.createDefaultState());
    }
  }

  createDefaultState() {
    return {
      comment: '',
    };
  }

  onAddComment = (event) => {
    event.preventDefault();

    const { scenarioId } = this.props;
    const { comment } = this.state;
    this.props.onAddComment({
      scenarioId,
      comment,
    });

    this.setState(this.createDefaultState());
  };

  onCommentChange = (event) => {
    const comment = event.target.value;

    this.setState({
      comment,
    });
  };

  render() {
    return (
      <form onSubmit={this.onAddComment}>
        <FormGroup>
          <FormControl componentClass="textarea" rows="3" placeholder="Entrez votre commentaire" value={this.state.comment} onChange={this.onCommentChange} />
        </FormGroup>
        <Button type="submit" bsStyle="primary">Ajouter le commentaire</Button>
      </form>
    )
  }

}

AddCommentForm.propTypes = {
  scenarioId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
